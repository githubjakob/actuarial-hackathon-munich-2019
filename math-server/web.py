from flask import Flask
from flask import request
import json
import pandas as pd
from math import log

app = Flask(__name__)

@app.route('/hello')
def helloIndex():
    from_engine = request.args.get('fromEngine')
    print(from_engine)
    return 'Hello World from Python Flask!'


def calc_d(dr):
    return 19.95


def calc_sc(cfs):
    # cfs used as prev_sc value
    return cfs * 1.025


def calc_i_cost(i_past, dbo, bp):
    return i_past * (dbo - 0.5 * bp)



def irfs_yearly(prev_service_cost, dbo, bp, interests):
    i_past, i_present = interests

    mid_dbo = dbo * ((1 + i_past) / (1 + i_present)) ** (calc_d(i_present - i_past))
    rms = mid_dbo - dbo

    cur_interest_cost = calc_i_cost(i_past, dbo, bp)
    cur_service_cost = calc_sc(prev_service_cost)

    return {
        'dbo_boy': dbo,
        'service_cost': cur_service_cost,
        'interest_cost': cur_interest_cost,
        'contributions': 0,
        'benefits_paid': bp,
        'remeasurements': rms,
        'dbo_eoy': dbo + cur_service_cost + cur_interest_cost + bp + rms
    }

@app.route('/basic-table')
def basic_tabelle():
    req_get = lambda val: request.args.get(val)
    get_bp = lambda year: float(req_get('PR - Zahlung {}'.format(year)))
    yearly_interest = list(map(json.loads, request.args.getlist('JahrZins[]')))
    dbo = float(req_get('PR - DBO'))
    cur_service_cost = float(req_get('PR - Current Service Cost'))
    print('yearly_interest:', yearly_interest)
    cur_year = yearly_interest[0]['jahr']
    bp = get_bp(cur_year)
    neg_zinz = float(req_get('PR - DBO Zins-'))
    pos_zinz = float(req_get('PR - DBO Zins+'))

    # def calc_d_start(dbo, r0, d_dbo, dr):
    #     return 

    m = (pos_zinz - neg_zinz) / 0.005
    t = pos_zinz 

    i_past, i_present = 0.02, float(yearly_interest[0]['zins'])
    res_start = irfs_yearly(0, dbo, -bp, (i_past, i_present))
    res_start['service_cost'] = cur_service_cost
    res = [{
        'data': res_start,
        'year': cur_year
    }]

    print('len(yearly_interest):', len(yearly_interest))
    for cur_year_data in yearly_interest[1:]:
        i_past, i_present = i_present, cur_year_data['zins']
        cur_year = cur_year_data['jahr']
        bp = -get_bp(cur_year)
        prev_res = res[-1]['data']
        prev_service_cost = prev_res['service_cost']
        prev_dbo = prev_res['dbo_eoy']
        res.append({
            'data': irfs_yearly(
                prev_service_cost, prev_dbo, bp, (i_past, i_present)),
            'year': cur_year
        })


    summary = {}
    keys = list(res[0]['data'].keys())
    for i in res:
        summary[i['year']] = list(map(lambda k: i['data'][k], keys))
    print(pd.DataFrame(data=summary, index=keys))
    return { 'data': res }

app.run(host='0.0.0.0', port= 81)

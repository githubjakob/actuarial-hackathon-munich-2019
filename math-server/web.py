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
    print('i_past:', i_past)


    d = calc_d(i_present - i_past)
    print('d:', d)
    mid_dbo = dbo * ((1 + i_past) / (1 + i_present)) ** d
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
    global calc_d
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
    print('neg_zinz:', neg_zinz)
    print('pos_zinz:', pos_zinz)
    print('dbo:', dbo)

    def calc_d_start(dbo_0, r0, d_dbo, dr):
        return log(d_dbo/dbo_0, 10) / log((1 + r0) / (1 + r0 + dr), 10)

    neg_d = calc_d_start(dbo, 0.02, neg_zinz, -0.0025)
    pos_d = calc_d_start(dbo, 0.02, pos_zinz, 0.0025)
    print('neg_d:', neg_d)
    print('pos_d:', pos_d)

    m = (pos_d - neg_d) / (0.0025 - (- 0.0025))
    print('m:', m)
    t = pos_d - (m * 0.0025)
    print('t:', t)

    calc_d = lambda dr: ([m * dr + t, print('dr:', dr)])[0]
    print('D({}) ='.format(0.0025), calc_d(0.0025))
    print('D({}) ='.format(-0.0025), calc_d(-0.0025))

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

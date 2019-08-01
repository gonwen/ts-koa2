// 案例
const baseUrl:string = 'http://admin.ac-mall.net'
const prefixbase:string = '/case'
const configData: object = {
    dec: '案例板块',
    path: prefixbase,
    api: [
        {
            url: prefixbase + '/list',
            org: baseUrl + '/shop/housing/zcmsinterface/getMainNewsData.jhtml?catalogIds=15122&showCount=10',
            pdt: {
                dt: {ky: 'result', ty: 'A'},
                fg: {ky: 'flag', ty: 'S'}
            },
            sig: [
                {ok: 'title', nk: 'title', rq: 1},
                {ok: 'summary', nk: 'dec'},
                {ok: 'publishdate', nk: 'date', rq: 1},
                {ok: 'source', nk: 'source', rq: 1},
                {ok: 'logofile', nk: 'img', rq: 1},
                {ok: 'redirecturl', nk: 'link', rq: 1}
            ]
        },
        {
            url: prefixbase + '/detail',
            org: baseUrl + '/jzm/api/v1/anon/getNodesByParentId',
            sig: [
                {ok: 'familyZhName', nk: 'name', rq: 1},
                {ok: 'id', nk: 'id', rq: 1}
            ]
        },
        {
            url: prefixbase + '/tree',
            org: baseUrl + '/jzm/api/v1/anon/JzmGoodsClassManage/getTreeByJson'
        },
        {
            url: prefixbase + '/detailpost',
            org: baseUrl + '/jzm/api/v1/anon/getNodesByParentId',
            omd: 'get',
            nmd: 'post',
            sig: [
                {ok: 'familyZhName', nk: 'name', rq: 1},
                {ok: 'id', nk: 'id', rq: 1}
            ]
        }
    ]
}
export = configData

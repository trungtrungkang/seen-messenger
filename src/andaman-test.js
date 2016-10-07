import AndamanService from './services/andaman';
//import './register-global-resources';//Register lotus-sj lib.

var andaman = AndamanService.singleton();

function testAndamanAsync(Andaman) {
    var ids = ["469cbc28-224a-11e6-9747-5d9ec75d577c", "46aa77dd-224a-11e6-937b-ad7b36ad31b5", "46a71c75-224a-11e6-807c-f79ade447349", "46a9184a-224a-11e6-856c-bc8ec818449f", "469c46f7-224a-11e6-a90a-94ade227c8a0", "46a76a96-224a-11e6-bfc6-a5930a9d8870", "dac2e6d1-2976-11e6-9a9b-eb9cbbb26ec1", "469edf0f-224a-11e6-a93c-8633b66c7565", "96022e39-294b-11e6-ae33-7dd6494ebfa9", "46a9666b-224a-11e6-a964-cf8e1f883380", "41c9e1e5-224b-11e6-8cde-c7d3dc626efc", "469d0a49-224a-11e6-99fd-4bd30b977c12", "46a87c09-224a-11e6-a9e8-439ae6fea655", "46940992-224a-11e6-866c-e132026baf3b", "397f1461-224b-11e6-b916-f43342248507", "397f1461-224b-11e6-b916-f43342248507", "397f1461-224b-11e6-b916-f43342248507", "397f1461-224b-11e6-b916-f43342248507", "469bf8d6-224a-11e6-be6d-d669a116bf2a", "d21a9720-4fe2-11e6-af08-6d900e5017d0", "6f37d3a1-224b-11e6-9e91-7179af81df9f"];

    var loadUsers = ids.map((id) => {
        return new Promise((resolve, reject) => {
            Andaman.get_user_by_id({ user_id: id }, (resp) => {
                if (resp.err) reject(resp.err);
                else resolve(resp.re);
            });
        });
    });

    Promise.all(loadUsers).then((users) => {
        console.log('Users loaded:', users);
    }).catch((err) => {
        console.error(err);
    });
}

function testAndamanSync(Andaman) {
    var ids = [
        "469cbc28-224a-11e6-9747-5d9ec75d577c", "46aa77dd-224a-11e6-937b-ad7b36ad31b5", "46a71c75-224a-11e6-807c-f79ade447349", 
        "46a9184a-224a-11e6-856c-bc8ec818449f", "469c46f7-224a-11e6-a90a-94ade227c8a0", "46a76a96-224a-11e6-bfc6-a5930a9d8870", 
        "dac2e6d1-2976-11e6-9a9b-eb9cbbb26ec1", "469edf0f-224a-11e6-a93c-8633b66c7565", "96022e39-294b-11e6-ae33-7dd6494ebfa9", 
        "46a9666b-224a-11e6-a964-cf8e1f883380", "41c9e1e5-224b-11e6-8cde-c7d3dc626efc", "469d0a49-224a-11e6-99fd-4bd30b977c12", 
        "46a87c09-224a-11e6-a9e8-439ae6fea655", "46940992-224a-11e6-866c-e132026baf3b", "397f1461-224b-11e6-b916-f43342248507", 
        "397f1461-224b-11e6-b916-f43342248507", "397f1461-224b-11e6-b916-f43342248507", "397f1461-224b-11e6-b916-f43342248507", 
        "469bf8d6-224a-11e6-be6d-d669a116bf2a", "d21a9720-4fe2-11e6-af08-6d900e5017d0", "6f37d3a1-224b-11e6-9e91-7179af81df9f"];

    var users = [];
    doTestAndamanSync(Andaman, ids, users);
}

function doTestAndamanSync(Andaman, ids, users) {
    if (ids.length) {
        var id = ids.pop();
        Andaman.get_user_by_id({ user_id: id }, (resp) => {
            if (!resp.err) users.push(resp.re);
            doTestAndamanSync(Andaman, ids, users);
        });
    }
    else {
        console.log('Users loaded:', users);
    }
}

function onTokenLogin(token) {
    return new Promise(function (resolve, reject) {
        var data = {
            id_token: token,
            device_id: 'browser'
        };

        andaman.users.token_login(data).then(function (resp) {
            if (!resp.err) {
                var user = resp.re.user;
                resolve(user);
            }
            else
                reject(resp.err);
        }).catch(function (err) {
            reject(err);
        });
    });
}

var token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpZCI6IjhkYTNhODJjLTE1YjctMTFlNi04YTA2LTE4NzY5YmY1NWU4MiIsImlhdCI6MTQ3MDExNzI1MX0.EvJ9gHFG2PRexMwGyjFK1LHDodpFHP57UHqkIc-wVRSkY35M-PvumsM_55AUHytBnR0HzF3Q5pfkmSbTFfuixA";

andaman.ready().then((Andaman) => {//config andaman and wait until it to be ready.
    onTokenLogin(token).then((user) => {//Logging-in by token is success
        //testAndamanSync(Andaman);
        testAndamanAsync(Andaman);
    });
});
import axios, { AxiosRequestConfig } from "axios";

class ApiService {

    static endPoint: string = 'http://70.12.111.173:3001/api';

    processImageMongo(fileName:string) : Promise<any> {
        return new Promise<any> ((resolve, reject) => {
            let url = `${ApiService.endPoint}/images/process`;

            let params = {
                fileName: fileName 
            }

            axios 
                .post(url, params) 
                .then(res => {
                    if(res.data.result) {
                        resolve(res.data.image);
                    }
                })
                .catch(err => {
                    console.log(err);
                    reject(err);
                })
        })
    }

    sendImageMongo(fileName:string, binary:Blob) : Promise<any> {
        return new Promise<any>( (resolve, reject) => {
            let url = `${ApiService.endPoint}/images/save`;

            let data = new FormData();
            data.append('fileObject', binary, fileName);

            console.log('binary: ', binary);

            axios
                .post(url, data, 
                    {
                        headers: {
                            'accept': '*/*',
                            'Accept-Language': 'en-US,en;q=0.8',
                            'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
                        }
                })
                .then(res => {
                    if(res.data.result) {
                        console.log(res.data);
                        resolve(res.data.data);
                    }
                    else {
                        console.log(res.data.err);
                        reject(res.data.err);
                    }
                })    
                .catch(err => {
                    console.log(err);
                    reject();
                })

        } )
    } 

    sendImage(filename:string, binary:Blob) : Promise<any> {
        return new Promise<any>( (resolve, reject) => {
            let url = `${ApiService.endPoint}/send`;

            let data = new FormData();
            data.append('fileObject', binary, filename);
            console.log('[binary] ', binary);
            console.log("imageData: ", data);

            axios
                .post(url, data,
                    {
                        headers: {
                            'accept': '*/*',
                            'Accept-Language': 'en-US,en;q=0.8',
                            'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
                        }
                    }
                )
                .then(res => {
                    console.log("palm line: ", res);
                    if(res.data.result) {
                        resolve(res.data.image);
                    }
                })
                .catch(err => {
                    console.log(err);
                })
        } )
    }

    

    getUsers(): Promise<any> {

        return new Promise<any>((resolve, reject) => {
            let url = `${ApiService.endPoint}/users`;

            axios
                .get(url)
                .then(res => {
                    if (res.data.result == true) {
                        resolve(res.data.users);
                    }
                    else {
                        reject(res.data.err);
                    }
                })
                .catch(err => {
                    reject();
                });
        });
    }

    checkToken() : Promise<any> {
        return new Promise<any>( (resolve, reject) => {
            let url = `${ApiService.endPoint}/users/checkToken`;

            // let params = {
            //     token: token
            // }

            axios
                .get(url)
                .then(res => {
                    if (res.data.result == true) {
                        console.log(res.data.user);
                        resolve(res.data.user);
                    }
                    else {
                        reject(res.data.err);
                    }
                })
                .catch(err => {
                    console.log(err);
                    reject();
                })
        } )
    }

    isUser(email:String, pw:String) : Promise<any> {
        return new Promise<any>( (resolve, reject) => {
            let url = `${ApiService.endPoint}/users/isuser`;

            let params = {
                id:email,
                pw:pw
            }

            axios
                .post(url, params)
                .then(res => {
                    if (res.data.result == true) {
                        console.log("res: ", res);
                        resolve(res.data);
                    }
                    else {
                        reject(res.data.err);
                    }
                })
                .catch(err => {
                    reject();
                });
        } )
    }

    getUserById(userid:String) : Promise<any> {
        return new Promise<any>( (resolve,reject) => {
            let url = `${ApiService.endPoint}/users/getuser/${userid}`;

            axios
                .get(url)
                .then(res => {
                    if(res.data.result == true) {
                        console.log(res.data)
                        resolve(res.data.user)
                    }
                    else {
                        reject(res.data.err)
                    }
                })
                .catch(err => {
                    reject();
                })
        } )
    }

    addUser(userinfo:any) : Promise<any> {
        return new Promise<any>( (resolve, reject) => {
            let url = `${ApiService.endPoint}/users/adduser`;

            let params = {
                id:userinfo.id,
                pw:userinfo.pw,
                name: userinfo.name
            }

            axios 
                .post(url, params)
                .then(res => {
                    if(res.data.result == true) {
                        console.log(res.data)
                        resolve(res.data.user)
                    }
                    else {
                        reject(res.data.err)
                    }
                })
                .catch(err => {
                    reject();
                })
        } )
    }

}
const apiService = new ApiService();
export default apiService;
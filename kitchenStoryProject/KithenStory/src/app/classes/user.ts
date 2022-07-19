export class User {

   

    constructor(private id:number,private userName:string,private email:string)
    {

    }

    public getUserName():string
    {
        return this.userName;
    }

    public getemail():string
    {
        return this.email;
    }

    
}

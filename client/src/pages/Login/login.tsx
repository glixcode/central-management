import { useState } from "react";

type Account = {
    email:string,
    password:string,
}

const Login = () => { 
    const [form, setForm] = useState<Account>({
        email: "",
        password: "",
    });
    const handlelogin = async () => {
        console.log(form);
        return
    }
    const handleChange = (key: string, value: string) => {
      setForm((prev) => ({
        ...prev,
        [key]: value,
      }));
    };

    return (
        <div className={`w-full gap-4 h-screen justify-content-center items-center`} 
        style={{display:'flex',gap:'4px',position:'fixed',top:0,left:0,width:'100%',height:'100%', justifyContent:'center',alignItems:"center",backgroundColor:'#333'}}>
            <form className="flex flex-col max-w-xl mx-auto" style={{display:'flex',background:'#f5f5f5', flexDirection:'column',width:'100%', maxWidth:'20%',margin:"0 auto", gap:15,padding:'30px',borderRadius:'10px',border:'1px solid gray'}}>
                <h1 style={{textAlign:'center',fontWeight:700,textTransform:'uppercase',marginTop:0}}>login</h1>
                <div style={{display:'flex',flexDirection:'column',gap:10}}>
                    <label htmlFor="email" style={{fontWeight:600}}>Email</label>
                    <input type="text" onChange={(e)=>handleChange('email',e.target.value)} placeholder="Email" autoComplete="off" style={{width:'100%',padding:'12px 5px',borderRadius:7, outline:'none',border:'1px solid #ccc'}}/>
                </div>
                <div style={{display:'flex',flexDirection:'column',gap:10}}>
                    <label htmlFor="email" style={{fontWeight:600}}>Password</label>
                    <input type="password" onChange={(e)=>handleChange('password',e.target.value)} placeholder="****"  autoComplete="off" style={{width:'100%',padding:'12px 5px',borderRadius:7, outline:'none',border:'1px solid #ccc'}}/>
                </div>  
                <button style={{padding:'12px',outline:'none',borderRadius:'8px',cursor:'pointer',marginTop:20,backgroundColor:'green',color:'white'}} onClick={handlelogin}>Login</button>
            </form>
        </div>
    )
}

export default Login

var str = "aaabbbbcccttttwqqqq"

const mp = new Map()

for(let i=0;i<str.length;i++){
    let ch = str.charAt(i)
    if(mp.has(ch)){
        mp.set(ch, mp.get(ch)+1)
    }else{
        mp.set(ch,1)
    }
}
console.log(mp);
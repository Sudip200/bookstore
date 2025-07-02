import http from 'http';

http.createServer((req,res)=>{
    res.writeHead(200);
    res.write('Api is running');
    res.end();
}).listen(3000,()=>{
    console.log('Server is running');
})
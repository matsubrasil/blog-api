const config = {

    // port
    port: process.env.PORT || 3000,


    // database
    db: 'mongodb://localhost:27017/blog-demo',

    // test environment
    test_env: 'test',
    test_db: 'mongodb//localhost:27017/blog-demo-test',
    test_port: 3001 

};

export default config;
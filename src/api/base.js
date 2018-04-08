if(process.env.REACT_APP_ENV==='prod') {
  var API_URL=process.env.REACT_APP_PROD_API_URL
} else if(process.env.REACT_APP_ENV==='staging') {
  var API_URL=process.env.REACT_APP_STAGING_API_URL
} else if(process.env.REACT_APP_ENV==='development') {
  var API_URL=`${process.env.REACT_APP_API_DEV_URL}`
}else{
  var API_URL=process.env.REACT_APP_API_DEV_URL
}
//CHECK THIS BEFORE USING!!!!!
module.exports = API_URL
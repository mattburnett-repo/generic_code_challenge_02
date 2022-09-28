
const handleSubmitClick = (e) => {
  e.preventDefault()

  alert('handleSubmitClick.domainName: ' + e.target.domainName.value)

  //  useQuery :)

  // do axios and return RiskAssessment | ApiError
  // var config = {
  //   method: "post",
  //   url: process.env.REACT_APP_BACKEND_URL,
  //   headers: {
  //     "Content-Type": "x-www-form-urlencoded",
  //   },
  //   data: data,
  // };

  // const result = await axios(config)
  // return result
}

module.exports = {
  handleSubmitClick
}
const getServerDatas = async (url, meth, body) => {
  const token = localStorage.getItem('token');
  const config = {
    method: meth,
    headers: {
      'Content-type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };
  if (body) {
    config.body = JSON.stringify(body);
  }
  const response = await fetch(`http://localhost:5005${url}`, config);
  if (response.status === 200) {
    return response.json();
  } else {
    console.log(response);
    return response.status;
  }
};
export default getServerDatas;

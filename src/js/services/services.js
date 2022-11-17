let postData = async (url, data) => {
  const res = await fetch(url, {
    // mode: 'no-cors',
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: data,
  });

  return await res.json();
};

let getResource = async (url) => {
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(`Could not fetch ${url}, status: ${res.status}`);
  };

  return await res.json();
};

export {postData};
export {getResource};
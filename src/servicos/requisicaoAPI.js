const baseURL = "http://localhost:8000/";

export async function post(endPoint, data) {
  const headers = {
    "Content-type": "application/json",
  };

  try {
    const resposta = await fetch(baseURL + endPoint, {
      method: "POST",
      body: JSON.stringify(data),
      headers,
    });

    const dados = await resposta.json();

    return { dados, erro: !resposta.ok };
  } catch (error) {
    throw error;
  }
}

export async function postConfirmarEntrega(endPoint, token) {
  const headers = {
    "Content-type": "application/json",
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  try {
    const resposta = await fetch(baseURL + endPoint, {
      method: "POST",
      headers,
    });

    let dados;
    
    if(!resposta.ok) {
      dados = await resposta.json();
    }

    return { dados, erro: !resposta.ok };
  } catch (error) {
    throw error;
  }
}

export async function get(endPoint, token) {
  const headers = {
    "Content-type": "application/json",
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  try {
    const resposta = await fetch(baseURL + endPoint, {
      headers,
    });

    const dados = await resposta.json();

    return { dados, erro: !resposta.ok };
  } catch (error) {
    throw error;
  }
}

export async function putConsumidor(endPoint, data, token) {
  const headers = {
    "Content-type": "application/json",
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  try {
    const resposta = await fetch(baseURL + endPoint, {
      method: "PUT",
      body: JSON.stringify(data),
      headers,
    });

    const dados = await resposta.json();

    return { dados, erro: !resposta.ok };
  } catch (error) {
    throw error;
  }
}
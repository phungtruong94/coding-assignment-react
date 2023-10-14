
export const getData = async <T>(url: string) => {
  const resp = await fetch(url)
  if (!resp.ok) {
    return {
      error: true,
      status: resp.status,
      statusText: resp.statusText
    }
  } else {
    const data = await resp.json()
    return {
      data: data as T
    }
  }
}

export const postData = async <T, D>(url: string, data: D) => {
  const resp = await fetch(url, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
  if (!resp.ok) {
    return {
      error: true,
      status: resp.status,
      statusText: resp.statusText
    }
  } else {
    const data = await resp.json()
    return {
      data: data as T
    }
  }
}

export const putData = async (url: string) => {
  const resp = await fetch(url, {
    method: 'PUT'
  });
  if (!resp.ok) {
    return {
      error: true,
      status: resp.status,
      statusText: resp.statusText
    }
  } else {
    return {
      success: true
    }
  }
}

export const delData = async (url: string) => {
  const resp = await fetch(url, {
    method: 'DELETE'
  });
  if (!resp.ok) {
    return {
      error: true,
      status: resp.status,
      statusText: resp.statusText
    }
  } else {
    return {
      success: true
    }
  }
}
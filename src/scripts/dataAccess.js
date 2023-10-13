// variable to store state after fetching from API
const applicationState = {
    "plumbers": [],
    "completions": [],
    "requests": [],
}

// API local host
const API = "http://localhost:8088"

// fetch request data from API
export const fetchRequests = () => {
    return fetch(`${API}/requests`)
        .then(response => {return response.json()})
        .then(
            (serviceRequests) => {
                // Store the external state in application state
                applicationState.requests = serviceRequests
            }
        )
}


// fetches plumber data from API/json database
export const fetchPlumbers = () => {
    return fetch(`${API}/plumbers`)
        .then(response => response.json())
        .then(
            (data) => {
                applicationState.plumbers = data
            }
        )
}


// fetches plumber data from API/json database
export const fetchCompletions = () => {
    return fetch(`${API}/completions`)
        .then(response => response.json())
        .then(
            (data) => {
                applicationState.completions = data
            }
        )
}


// export requests in application state to make data renderable to HTML
export const getRequests = () => {
    return applicationState.requests.map(request => ({...request}))
}

// export plumbers in application state to make data renderable to HTML
export const getPlumbers = () => {
    return applicationState.plumbers.map(plumber => ({...plumber}))
}

// export requests in completions state to make data renderable to HTML
export const getCompletions = () => {
    return applicationState.completions.map(completion => ({...completion}))
}




// sends request made by customer in browser to json database
export const sendRequest = (userServiceRequest) => {
    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userServiceRequest)
    }


    return fetch(`${API}/requests`, fetchOptions)
        .then(response => response.json())
        .then(() => {
            mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
        })
}


// sends completion status to json database
export const saveCompletion = (completionSatus) => {
    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(completionSatus)
    }


    return fetch(`${API}/completions`, fetchOptions)
        .then(response => response.json())
        .then(() => {
            mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
        })
}






// deletes request from json database which also removes the request from the browser 
export const deleteRequest = (id) => {
    return fetch(`${API}/requests/${id}`, { method: "DELETE" })
        .then(
            () => {
                mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
            }
        )
}

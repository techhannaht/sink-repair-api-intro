import { getRequests, saveCompletion } from "./dataAccess.js"
import { deleteRequest } from "./dataAccess.js"
import { getPlumbers } from "./dataAccess.js"
import { ServiceForm } from "./ServiceForm.js"

export const Requests = () => {
    const requests = getRequests()
    const plumbers = getPlumbers()

    let html = `

        <table>  ${
            requests.map(request => {
                return `<li> ${request.description} 
                <select class="plumbers" id="plumbers">
                <option value="">Choose</option>
                ${
                    plumbers.map(
                        plumber => {
                            return `<option value="${request.id}--${plumber.id}">${plumber.name}</option>`
                        }
                    ).join("")
                }
            </select>
                <button class="request__delete" id="request--${request.id}"> Delete </button>
        
                </li>`
            }).join(" ")
        } 
        
        </table> `
           
        

    return html
}


const mainContainer = document.querySelector("#container")

mainContainer.addEventListener("click", click => {
    if (click.target.id.startsWith("request--")) {
        const [,requestId] = click.target.id.split("--")
        deleteRequest(parseInt(requestId))
    }
})


mainContainer.addEventListener(
    "change",
    (event) => {
        if (event.target.id === "plumbers") {
            
            const [requestId, plumberId,] = event.target.value.split("--")
            const date_created = new Date

            const dataForCompletions = {
                request: requestId,
                plumber: plumberId,
                dateCreated: date_created,
             }

             saveCompletion(dataForCompletions)
        }
    }
)
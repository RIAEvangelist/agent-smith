
import { GITHUB_NOTIFICATIONS } from './consts/endpoints.js';

async function notifications(participating=false,all=true) {
    console.log(this)
    const notifications={}
    notifications[this.username]=[];

    try {
        const response = await fetch(
            GITHUB_NOTIFICATIONS + `?all=${all}&participating=${participating}`,
            { headers }
        );

        if (!response.ok) {
            throw new Error(`HTTP error ${response.status}`);
        }

        const data = await response.json();
        console.log(data.length);

        data.forEach(
            (entry) => {
                const owner = entry.repository.owner.login;
    
                if (!notifications[owner]) {
                    notifications[owner] = [];
                }
    
                notifications[owner].push(entry);
            }
        );
    } catch (error) {
        console.error('Error fetching notifications:', error);
    }
    
    return notifications;
}

// Periodically fetch notifications (e.g., every 5 minutes)
//setInterval(participatingNotifications, 5 * 60 * 1000);

//export the class so more than one smith can be running in an app.
export class Smith{
    constructor(username='',token=''){
        this.username=username;
        this.token=token;
    }

    #header={
        Authorization: `token ${this.token}`,
    }

    get headers(){
        return 
    }

    get notifications(){
        return notifications;
    }

    set notifications(data){
        return notifications;
    }


} 
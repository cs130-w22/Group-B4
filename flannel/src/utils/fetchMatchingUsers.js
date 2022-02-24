/* 
helper function to fetch users matching classesLabels, interestsLabels, and affiliationLabels criteria
returns object which contains a field 'status' which is 0 for error, 1 for valid response
 */
export async function fetchMatchingUsers({ classesLabels, interestsLabels, affiliationsLabels }) {
    // get stored user object
    const user = JSON.parse(localStorage.getItem('user'));
    // get cookie and form request object
    const cookies = document.cookie;
    const requestObj = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: cookies
        },
    };

    // form label param string
    let requestLabelsArr = JSON.stringify([...classesLabels, ...interestsLabels, ...affiliationsLabels]);
    // fetch matching users from backend
    const matchingUsersResponse = await fetch(`/api/label?username=${user.username}&labels=${requestLabelsArr}`, requestObj);
    if (matchingUsersResponse.status !== 200) {
        // not authorized, redirect to login
        return { status: 0 };
    }

    const allMatchingUsers = (await matchingUsersResponse.json()).matches;
    const matchingUsers = allMatchingUsers.filter(x => x.username !== user.username);    
    return { status: 1, matchingUsers };
}


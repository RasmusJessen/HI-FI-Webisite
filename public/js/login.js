
(() => {
    document.addEventListener('DOMContentLoaded', () => {
        const form = document.querySelector('.loginForm');

        form.onsubmit = () => {
            const data = JSON.stringify({
                'username': form.username.value,
                'password': form.password.value
            });
            console.log(data);

            fetch('http://localhost:1337/login', {
                'method': 'POST',
                'headers': {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Content-Length': data.length
                },
                'mode': 'cors',
                'cache': 'default',
                'body': data
            })
                .then((result) => result.json())
                .then((data) => {
                    localStorage.setItem('token', data.AccessToken);
                    localStorage.setItem('userid', data.ID);
                    document.getElementById('status').innerHTML = "Du er nu logget ind ...";
                    
                    window.location.replace("Admin.html");
                })
                .catch((err) => {
                    console.log(err);
                });

            return false;
        };
    });
})();

document.getElementById('logud').addEventListener('click', () => {
    if (confirm('Vil du logge af?')) {
        localStorage.clear();
        window.location.replace("HIFI.html");
    }
    
})

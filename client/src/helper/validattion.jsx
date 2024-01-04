
export default function validattion(values) {
    let error = {}
    const email_pattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/;
    const password_pattern = /[`!@#$%^&*()_+\-=[\]{};':"\\|,.<>?~]/;

    if(values.email === ""){
        error.email = 'name should not be empty'
    }
    if(!email_pattern.test(values.email)) {
        error.email = "email does not match"
    }
    if(values.password === '') {
        error.password = 'Password should not be empty'
    }
    if(!password_pattern.test(values.password)) {
        error.password = 'Password does not match'
    }
    if(values.confirm_password === '' || values.confirm_password !== values.password) {
        error.confirm_password = 'Password does not match'
    }

    return error;
}

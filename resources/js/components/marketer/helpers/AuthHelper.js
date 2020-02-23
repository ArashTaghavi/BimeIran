import React, { setGlobal } from 'reactn'
import { toast } from 'react-toastify'

export const tokenStorage = sessionStorage

let tokenName = 'marketer-token'

export function is_logged_in() {
    return !!tokenStorage.getItem(tokenName)
}

export function login(token) {
    tokenStorage.setItem(tokenName, token)
    setGlobal({
        loggedIn: true
    }, () => {
        window.scrollTo(0, 0)
        toast('خوش آمدید!', {type: 'success'})
    })
}

export function logout() {
    tokenStorage.removeItem(tokenName)
    setGlobal({
        loggedIn: false
    }, () => {
        toast('با موفقیت از سامانه خارج شدید. ', {type: 'success'})
    })
}

export function token() {
    return !!tokenStorage.getItem(tokenName) ? tokenStorage.getItem(tokenName) : null
}

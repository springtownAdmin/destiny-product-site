import React from 'react'

const useStorage = () => {


    const getItem = ({ type = 'session', key = '' }) => {

        if (type === 'session' && key !== '') {

            if (typeof sessionStorage !== 'undefined') {

                const item = sessionStorage.getItem(key);
                return item;

            }

        }

        if (type === 'local' && key !== '') {

            if (typeof localStorage !== 'undefined') {

                const item = localStorage.getItem(key);
                return item;

            }

        }

        return null;

    }

    const setItems = ({ type = 'session', key = '', data = null }) => {

        if (type === 'session' && data !== null && key !== '') {

            if (typeof sessionStorage !== 'undefined') {

                console.log(data);

                sessionStorage.setItem(key, JSON.stringify(data));

            }

        }

        if (type === 'local' && data !== null && key !== '') {

            if (typeof localStorage !== 'undefined') {

                localStorage.setItem(key, JSON.stringify(data));

            }

        }


    }

    const setItem = ({ type = 'session', key = '', data = null }) => {

        if (type === 'session' && data !== null && key !== '') {

            if (typeof sessionStorage !== 'undefined') {

                sessionStorage.setItem(key, data);

            }

        }

        if (type === 'local') {

            if (typeof localStorage !== 'undefined') {

                sessionStorage.setItem(key, data);

            }

        }

    }

    const getItems = ({ type = 'session', key = '' }) => {

        if (type === 'session' && key !== '') {

            if (typeof sessionStorage !== 'undefined') {

                const items = JSON.parse(sessionStorage.getItem(key));
                return items;

            }

        }

        if (type === 'local' && key !== '') {

            if (typeof localStorage !== 'undefined') {

                const items = JSON.parse(localStorage.getItem(key));
                return items;

            }

        }

        return null;
        
    }

    const clearAll = ({ type = 'session' }) => {

        if (type === 'session') {

            if (typeof sessionStorage !== 'undefined') sessionStorage.clear();

        }

        if (type === 'local') {

            if (typeof localStorage !== 'undefined') localStorage.clear();

        }

    }

    return { getItem, getItems, setItem, setItems, clearAll };
 
}

export default useStorage
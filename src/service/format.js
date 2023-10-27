import {format} from "date-fns";

const formatCurrency = (price) => {
    return new Intl.NumberFormat('vi-VN', {style: 'currency', currency: 'VND'}).format(price);
}

const formatDate = (date) => {
    return format(new Date(date), "dd/MM/yyyy");
}

const formatDateTime = (dateTime) => {
    return format(new Date(dateTime), "dd/MM/yyyy HH:mm");
}

export {formatCurrency, formatDate, formatDateTime};
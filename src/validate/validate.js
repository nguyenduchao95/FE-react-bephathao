import * as Yup from "yup";
import {checkEmail, checkUsername} from "../service/loginRegisterService";
import {checkPasswordById} from "../service/accountService";

const account = JSON.parse(localStorage.getItem("account-bephathao"));
const orderSchema = Yup.object().shape({
    firstName: Yup.string()
        .min(2, 'Tên tối thiểu phải 2 kí tự')
        .max(10, 'Tên quá dài')
        .required('Vui lòng không được để trống'),
    lastName: Yup.string()
        .min(2, 'Họ tối thiểu phải 2 kí tự')
        .max(20, 'Họ quá dài')
        .required('Vui lòng không được để trống'),
    phoneNumber: Yup.string()
        .matches(/(((\+|)84)|0)(3|5|7|8|9)+([0-9]{8})\b/, 'Đây không phải là số điện thoại')
        .required('Vui lòng không được để trống'),
    province: Yup.string()
        .required('Vui lòng không được để trống'),
    district: Yup.string()
        .required('Vui lòng không được để trống'),
    ward: Yup.string()
        .required('Vui lòng không được để trống'),
    houseNumber: Yup.string()
        .required('Vui lòng không được để trống'),
})

const loginSchema = Yup.object().shape({
    username: Yup.string()
        .test("Check username", "Tên đăng nhập sai", async (value) => {
            const isExist = await checkUsername({username: value});
            return isExist.data;
        })
        .required('Vui lòng không được để trống'),
    password: Yup.string()
        .required('Vui lòng không được để trống')
})

const registerSchema = Yup.object({
    username: Yup.string()
        .matches(/^[A-Za-z0-9]+(?:[_][A-Za-z0-9]+)*$/, 'Tên đăng nhập không được chứa kí tự đặc biệt')
        .test('unique', 'Tên đăng nhập đã tồn tại', async (value) => {
            const isExist = await checkUsername({username: value});
            return !isExist.data;
        })
        .required('Vui lòng nhập tên đăng nhập'),
    email: Yup.string()
        .email('Email không hợp lệ')
        .test('unique', 'Email đã tồn tại', async (value) => {
            const isExist = await checkEmail({email: value});
            return !isExist.data;
        })
        .required('Vui lòng nhập email'),
    password: Yup.string()
        .min(6, 'Mật khẩu phải chứa ít nhất 6 kí tự')
        .matches(
            /^[^\s!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]+$/,
            'Mật khẩu không được chứa kí tự đặc biệt'
        )
        .matches(
            /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).+$/,
            'Mật khẩu phải chứa chữ cái viết hoa, viết thường và ký tự số'
        )
        .required('Mật khẩu không được bỏ trống'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Mật khẩu không khớp')
        .required('Mật khẩu không được bỏ trống')
});

const editAccountInfoSchema = Yup.object().shape({
    firstName: Yup.string()
        .min(2, 'Tên tối thiểu phải 2 kí tự')
        .max(10, 'Tên quá dài')
        .required('Vui lòng không được để trống'),
    lastName: Yup.string()
        .min(2, 'Họ tối thiểu phải 2 kí tự')
        .max(20, 'Họ quá dài')
        .required('Vui lòng không được để trống'),
    phoneNumber: Yup.string()
        .matches(/^(((\+|)84)|0)(3|5|7|8|9)+([0-9]{8})\b$/, 'Đây không phải là số điện thoại')
        .required('Vui lòng không được để trống'),
    email: Yup.string()
        .email('Email không hợp lệ')
        .test('unique', 'Email đã tồn tại', async (value) => {
            const isExist = await checkEmail({email: value});
            if(isExist.data){
                return isExist.data.username === account.username;
            }
            return true;
        })
        .required('Vui lòng nhập email'),
    dateOfBirth: Yup.date()
        .required('Vui lòng không được để trống'),
    avatar: Yup.string()
        .required('Vui lòng không được để trống'),
    province: Yup.string()
        .required('Vui lòng không được để trống'),
    district: Yup.string()
        .required('Vui lòng không được để trống'),
    ward: Yup.string()
        .required('Vui lòng không được để trống'),
    houseNumber: Yup.string()
        .required('Vui lòng không được để trống'),
})

const changeAccountPasswordSchema = Yup.object({
    password: Yup.string()
        .test('incorrect', 'Mật khẩu không đúng', async (value) => {
            const isExist = await checkPasswordById(account.id, {password: value});
            return isExist.data;
        })
        .required('Vui lòng không được để trống'),
    newPassword: Yup.string()
        .min(6, 'Mật khẩu phải chứa ít nhất 6 kí tự')
        .matches(
            /^[^\s!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]+$/,
            'Mật khẩu không được chứa kí tự đặc biệt'
        )
        .matches(
            /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).+$/,
            'Mật khẩu phải chứa chữ cái viết hoa, viết thường và ký tự số'
        )
        .test('incorrect', 'Mật khẩu mới phải khác với mật khẩu cũ', async (value) => {
            const isExist = await checkPasswordById(account.id, {password: value});
            return !isExist.data;
        })
        .required('Vui lòng không được để trống'),
    confirmNewPassword: Yup.string()
        .oneOf([Yup.ref('newPassword'), null], 'Mật khẩu không khớp')
        .required('Vui lòng không được để trống')
});

const productSchema = Yup.object().shape({
    name: Yup.string()
        .min(2, 'Tên tối thiểu phải 2 kí tự')
        .required('Vui lòng không được để trống'),
    category: Yup.string()
        .required('Vui lòng không được để trống'),
    code: Yup.string()
        .required('Vui lòng không được để trống'),
    brand: Yup.string()
        .required('Vui lòng không được để trống'),
    origin: Yup.string()
        .required('Vui lòng không được để trống'),
    price: Yup.number()
        .min(1, 'Giá tiền phải lớn hơn 0')
        .required('Vui lòng không được để trống'),
    sale: Yup.number()
        .min(0, 'Giảm giá phải lớn hơn hoặc bằng 0')
        .max(100, 'Giảm giá phải nhỏ hơn hoặc bằng 100')
        .required('Vui lòng không được để trống'),
    guarantee: Yup.number()
        .min(0, 'Thời gian bảo hành phải lớn hơn hoặc bằng 0')
        .required('Vui lòng không được để trống'),
    description: Yup.string()
        .required('Vui lòng không được để trống'),
    technicalInformation: Yup.string()
        .required('Vui lòng không được để trống'),
    avatar: Yup.string()
        .required('Vui lòng không được để trống'),
    images: Yup.string()
        .required('Vui lòng không được để trống')
})


export {orderSchema, loginSchema,registerSchema, editAccountInfoSchema, changeAccountPasswordSchema, productSchema};
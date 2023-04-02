const myEmail = 'ibnualinsani23@gmail.com'
const btn = document.querySelector('button');
btn.addEventListener('click', getData)

function getData() {
    let data = {
        nama : document.getElementById('nama').value,
        email : document.getElementById('email').value,
        phone : document.getElementById('phone').value,
        subject : document.getElementById('subject').value,
        message : document.getElementById('message').value
    };

    let a = document.createElement('a');
    a.href = `https://mail.google.com/mail/?view=cm&fs=1&to=${myEmail}&su=${data.subject}&body=Halo, nama saya ${data.nama}. ${data.message} \n\n hubungi saya di nomor ini: ${data.phone}`;
    a.click();
}














// function getData() {

//     const nama = document.getElementById('nama').value;
//     const email = document.getElementById('email').value;
//     const phone = document.getElementById('phone').value;
//     const subject = document.getElementById('subject').value;
//     const message = document.getElementById('message').value;
    
//     if ( nama == '') {
//         return alert('nama ndak boleh kosong toh mas')
//     } else if (email == '') {
//         return alert('emailmu ndak boleh kosong toh mas')
//     } else if (message == '') {
//         return alert('koe arep ngomong opo?')
//     }
    
//     const myEmail = "ibnualinsani23@gmail.com"
//     let a = document.createElement('a');
//     a.href = `https://mail.google.com/mail/?view=cm&fs=1&to=${myEmail}&su=${subject}&body=Halo, nama saya ${nama}. ${message} \n\n hubungi saya di nomor ini: ${phone}`
//     // a.href = `mailto:${myEmail}?subject=${subject}&body=Halo, nama saya ${nama}. ${message} \n\n Nomor handphone: ${phone}`;
//     a.click()

//     console.log(nama);
//     console.log(email);
//     console.log(phone);
//     console.log(subject);
//     console.log(message);
// }

// const btn = document.querySelector('button');

// btn.addEventListener('click', function(e) {
//     e.preventDefault();
//     const myEmail = "ibnualinsani23@gmail.com";

//     let data = {
//         nama: document.getElementById('nama').value,
//         email: document.getElementById('email').value,
//         phone: document.getElementById('phoneNumber').value,
//         subject: document.getElementById('subject').value,
//         message: document.getElementById('message').value
//     }
    
//     const body = `Halo, nama saya ${data.nama}. ${data.message} \n\n Nomor handphone: ${data.phone}`;
//     const mailtoLink = `mailto:${myEmail}?subject=${data.subject}&body=${encodeURIComponent(body)}`;
//     window.location.href = mailtoLink;
    


//     // let data = {
//     //     nama : document.getElementById('nama').value,
//     //     email : document.getElementById('email').value,
//     //     phone : document.getElementById('phoneNumber').value,
//     //     subject : document.getElementById('subject').value,
//     //     message : document.getElementById('message').value
//     // }

//     // const body = `Halo, nama saya ${data.nama}.\n${data.message} \n\n Nomor handphone: ${data.phone}`;
//     // const mailtoLink = `mailto:${myEmail}?subject=${data.subjec}&body=${encodeURIComponent(body)}`;
//     // window.location.href = mailtoLink;
//     alert('sukses')
// })
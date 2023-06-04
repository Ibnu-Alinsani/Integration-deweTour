// Card Performance
import guarantee from "../assets/guarantee.svg";
import heart from "../assets/heart.svg";
import agent from "../assets/agent.svg";
import group from "../assets/Group.svg";

// Card Menu
import dua from "../assets/Rectangle-6.png";
import tiga from "../assets/Rectangle-7.png";
import satu from "../assets/Rectangle-8.png";
import empat from "../assets/Rectangle-9.png";
import Booking from "../pages/booking";
import user1 from "../assets/user1.jpg";
import user2 from "../assets/user2.jpg";
import user3 from "../assets/user3.jpg";

import action from "../assets/action-admin.png";

// for struk payment
import struk1 from "../assets/struk.webp";
import struk2 from "../assets/struk.jpg";
import struk3 from "../assets/struk2.jpg";

export const DataPerformances = [
  {
    logo: guarantee,
    performance: "Best Price Guarantee",
    description: "A small river named Duren flows by their place and supplies",
  },
  {
    logo: heart,
    performance: "Traveller Love Us",
    description: "A small river named Duren flows by their place and supplies",
  },
  {
    logo: agent,
    performance: "Best Travel Agent",
    description: "A small river named Duren flows by their place and supplies",
  },
  {
    logo: group,
    performance: "Our Dedicated Support",
    description: "A small river named Duren flows by their place and supplies",
  },
];

export const Locates = [
  {
    id: 0,
    gambar: [satu, dua, tiga, empat, satu, dua],
    nama: "6D/4N Fun Tassie Vacation with your Family",
    harga: 12398000,
    quota: 30,
    fillQuota: 10,
    hotel: "Hotel 4 Nights",
    penerbangan: "Qatar Airways",
    eat: "Included as Itinerary",
    duration: "6 Day 4 Night",
    dateTrip: "26 Agustus 2020",
    negara: "Australia",
    description:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Omnis, esse doloribus. In alias necessitatibus accusamus modi voluptatibus, possimus suscipit est libero amet praesentium omnis distinctio explicabo quisquam hic earum dolor tenetur harum vel nam! Aspernatur quos voluptate aut reprehenderit facere ut perferendis animi ipsa incidunt? Possimus exercitationem voluptas mollitia voluptates.",
  },
  {
    id: 1,
    gambar: [satu, dua, tiga, empat, satu, dua],
    nama: "6D/4N Exciting Summer in",
    harga: 10288000,
    quota: 50,
    fillQuota: 24,
    hotel: "Hotel 4 Nights",
    penerbangan: "Qatar Airways",
    eat: "Included as Itinerary",
    duration: "6 Day 4 Night",
    dateTrip: "26 Agustus 2020",
    negara: "South Korea",
    description:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Omnis, esse doloribus. In alias necessitatibus accusamus modi voluptatibus, possimus suscipit est libero amet praesentium omnis distinctio explicabo quisquam hic earum dolor tenetur harum vel nam! Aspernatur quos voluptate aut reprehenderit facere ut perferendis animi ipsa incidunt? Possimus exercitationem voluptas mollitia voluptates.",
  },
  {
    id: 2,
    gambar: [satu, dua, tiga, empat, satu, dua],
    nama: "8D/6N Wonderful Autum",
    harga: 28999000,
    quota: 41,
    fillQuota: 25,
    hotel: "Hotel 4 Nights",
    penerbangan: "Qatar Airways",
    eat: "Included as Itinerary",
    duration: "6 Day 4 Night",
    dateTrip: "26 Agustus 2020",
    negara: "Japan",
    description:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Omnis, esse doloribus. In alias necessitatibus accusamus modi voluptatibus, possimus suscipit est libero amet praesentium omnis distinctio explicabo quisquam hic earum dolor tenetur harum vel nam! Aspernatur quos voluptate aut reprehenderit facere ut perferendis animi ipsa incidunt? Possimus exercitationem voluptas mollitia voluptates.",
  },
  {
    id: 3,
    gambar: [satu, dua, tiga, empat, satu, dua],
    nama: "4D/3N Overland Jakarta Bekasi",
    harga: 3188000,
    quota: 21,
    fillQuota: 10,
    hotel: "Hotel 4 Nights",
    penerbangan: "Qatar Airways",
    eat: "Included as Itinerary",
    duration: "6 Day 4 Night",
    dateTrip: "26 Agustus 2020",
    negara: "Indonesia",
    description:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Omnis, esse doloribus. In alias necessitatibus accusamus modi voluptatibus, possimus suscipit est libero amet praesentium omnis distinctio explicabo quisquam hic earum dolor tenetur harum vel nam! Aspernatur quos voluptate aut reprehenderit facere ut perferendis animi ipsa incidunt? Possimus exercitationem voluptas mollitia voluptates.",
  },
  {
    id: 4,
    gambar: [satu, dua, tiga, empat, satu, dua],
    nama: "4D/3N Labuan Bajo Delight",
    harga: 10488000,
    quota: 35,
    fillQuota: 25,
    hotel: "Hotel 4 Nights",
    penerbangan: "Qatar Airways",
    eat: "Included as Itinerary",
    duration: "6 Day 4 Night",
    dateTrip: "26 Agustus 2020",
    negara: "Indonesia",
    description:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Omnis, esse doloribus. In alias necessitatibus accusamus modi voluptatibus, possimus suscipit est libero amet praesentium omnis distinctio explicabo quisquam hic earum dolor tenetur harum vel nam! Aspernatur quos voluptate aut reprehenderit facere ut perferendis animi ipsa incidunt? Possimus exercitationem voluptas mollitia voluptates.",
  },
  {
    id: 5,
    gambar: [satu, dua, tiga, empat, satu, dua],
    nama: "5D/4N Magic Tokyo Fun",
    harga: 11188000,
    quota: 61,
    fillQuota: 27,
    hotel: "Hotel 4 Nights",
    penerbangan: "Qatar Airways",
    eat: "Included as Itinerary",
    duration: "6 Day 4 Night",
    dateTrip: "26 Agustus 2020",
    negara: "Japan",
    description:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Omnis, esse doloribus. In alias necessitatibus accusamus modi voluptatibus, possimus suscipit est libero amet praesentium omnis distinctio explicabo quisquam hic earum dolor tenetur harum vel nam! Aspernatur quos voluptate aut reprehenderit facere ut perferendis animi ipsa incidunt? Possimus exercitationem voluptas mollitia voluptates.",
  },
];

export const user = [
  {
    id: 0,
    img: user1,
    email: "ibnualinsani1@gmail.com",
    password: 1,
    name: "ibnu Alinsani",
    gender: "male",
    handphone: "08221914423",
    order: Locates[0],
    alamat: "Perumahan Permata Bintaro Residence C-3",
  },
  {
    id: 1,
    img: user2,
    email: "ibnualinsani12@gmail.com",
    password: 12,
    name: "Mahardika",
    gender: "male",
    handphone: "08221914423",
    order: Locates[1],
    alamat: "Perumahan Permata Bintaro Residence C-3",
  },
  {
    id: 2,
    img: user3,
    email: "ibnualinsani123@gmail.com",
    password: 123,
    name: "Ayam geprek",
    gender: "male",
    handphone: "08221914423",
    order: Locates[2],
    alamat: "Perumahan Permata Bintaro Residence C-3",
  },
  {
    id: 3,
    email: "ibnualinsani1234@gmail.com",
    password: 1234,
    name: "Pecel ayam",
    gender: "male",
    handphone: "08221914423",
    order: Locates[3],
    alamat: "Perumahan Permata Bintaro Residence C-3",
  },
  {
    id: 4,
    email: "ibnualinsani12345@gmail.com",
    password: 12345,
    name: "ikan bakar",
    gender: "male",
    handphone: "08221914423",
    order: Locates[4],
    alamat: "Perumahan Permata Bintaro Residence C-3",
  },
];

export const payment = [
  {
    id: 0,
    user: user[0],
    buktiTransfer: "bca.jpg",
    statusPayment: "Approve",
    qty: 1,
    total: "IDR. 12.398.000",
    date: "Senin, 27 Februari 2023",
    action: action,
    buktiImg: struk1,
  },
  {
    id: 1,
    user: user[1],
    buktiTransfer: "bri.jpg",
    statusPayment: "Cancel",
    action: action,
    qty: 2,
    date: "Selasa, 25 Maret 2023",
    total: "IDR. 10,288,000",
    buktiImg: struk2,
  },
  {
    id: 2,
    user: user[2],
    buktiTransfer: "bni.jpg",
    statusPayment: "Pending",
    qty: 3,
    date: "Rabu, 10 Januari 2023",
    total: "IDR. 9,564,000",
    action: action,
    buktiImg: struk3,
  },
  {
    id: 3,
    user: user[3],
    buktiTransfer: "mandiri.jpg",
    statusPayment: "Approve",
    qty: 2,
    date: "Kamis, 30 April 2023",
    total: "IDR. 6,376,000",
    action: action,
    buktiImg: struk2,
  },
  {
    id: 4,
    user: user[4],
    buktiTransfer: "ayam.jpg",
    statusPayment: "Cancel",
    qty: 1,
    date: "Jumat, 30 Februari 2023",
    total: "IDR. 10,488,000",
    action: action,
    buktiImg: struk3,
  },
];

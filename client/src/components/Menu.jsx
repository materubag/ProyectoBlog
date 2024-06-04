import React from "react";

const Menu = () => {

    const posts = [
        {
          id: 1,
          title: "Los mejores paisajes del mundo",
          desc: "Esta imagen es solo una prueab para el blog de disenio",
          img: "https://images.pexels.com/photos/6685421/pexels-photo-6685421.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    
        },
        {
          id: 2,
          title: 'Los mejores Drones calidad precio 2024',
          desc: 'Esta imagen es solo una prueab para el blog de disenio',
          img: 'https://www.adslzone.net/app/uploads-adslzone.net/2015/12/drones-camara-1200x675.jpg',
        },
        {
          id: 3,
          title: '¿Sabes sobre todos los beneficios de la fruta?',
          desc: 'Esta imagen es solo una prueab para el blog de disenio',
          img: 'https://images.pexels.com/photos/7008010/pexels-photo-7008010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    
        },  
      ];

    return (
        <div className="menu">
            <h1>Otros posts que te podrian gustar</h1>
{posts.map(post=>(
    <div className="post" key={post.id}>
        <img src={post.img} alt=""></img>
        <h2>{post.title}</h2>
        <button>Leer Mas</button>
    </div>
))}
        </div>
    );
};

export default Menu;

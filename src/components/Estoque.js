import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import EstoqueDataService from "../services/EstoqueService";

const Estoque = props => {
  const { id }= useParams();
  let navigate = useNavigate();

  const initialEstoqueState = {
    id: null,
    title: "",
    description: "",
    published: false
  };
  const [currentEstoque, setCurrentEstoque] = useState(initialEstoqueState);
  const [message, setMessage] = useState("");

  const getEstoque = id => {
    EstoqueDataService.get(id)
      .then(response => {
        setCurrentEstoque(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    if (id)
      getEstoque(id);
  }, [id]);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setCurrentEstoque({ ...currentEstoque, [name]: value });
  };

  const updatePublished = status => {
    var data = {
      id: currentEstoque.id,
      title: currentEstoque.title,
      description: currentEstoque.description,
      published: status
    };

    EstoqueDataService.update(currentEstoque.id, data)
      .then(response => {
        setCurrentEstoque({ ...currentEstoque, published: status });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const updateEstoque = () => {
    EstoqueDataService.update(currentEstoque.id, currentEstoque)
      .then(response => {
        console.log(response.data);
        setMessage("The Estoque was updated successfully!");
      })
      .catch(e => {
        console.log(e);
      });
  };

  const deleteEstoque = () => {
    EstoqueDataService.remove(currentEstoque.id)
      .then(response => {
        console.log(response.data);
        navigate("/Estoques");
      })
      .catch(e => {
        console.log(e);
      });
  };

};

export default Estoque;
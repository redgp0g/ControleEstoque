import React, { useState, useEffect } from "react";
import EstoqueDataService from "../services/EstoqueService";
import FuncionarioService from "../services/FuncionarioService";
import PecaService from "../services/PecaService";
import { format } from 'date-fns';

const AddEstoque = () => {
    const initialEstoqueState = {
        id: 0,
        idfuncionario: 0,
        idpeca: 0,
        data: format(new Date(), 'yyyy-MM-dd'),
        quantidade: 0,
    };
    const [Estoque, setEstoque] = useState(initialEstoqueState);
    const [submitted, setSubmitted] = useState(false);
    const [funcionarios, setFuncionarios] = useState([]);
    const [pecas, setPecas] = useState([]);


    useEffect(() => {
        FuncionarioService.getNamesIds()
            .then((response) => {
                setFuncionarios(response.data);
            })
            .catch((error) => {
                console.log(error);
            });

            PecaService.getPecas()
            .then((response) => {
                setPecas(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);
    const handleInputChange = event => {
        const { name, value } = event.target;
        setEstoque({ ...Estoque, [name]: value });
    };

    const saveEstoque = () => {
        var data = {
            id: Estoque.id,
            idfuncionario: Estoque.idfuncionario,
            idpeca: Estoque.idpeca,
            data: Estoque.data,
            quantidade: Estoque.quantidade
        };
        console.log(Estoque);
        EstoqueDataService.create(data)
            .then(response => {
                setEstoque({
                    ...Estoque,
                    id: response.data.id,
                    idfuncionario: response.data.idfuncionario,
                    idpeca: response.data.idpeca,
                    data: response.data.data,
                    quantidade: response.data.quantidade,
                });
                setSubmitted(true);
                console.log(response.data);
            })
            .catch(e => {
                console.log(data);
                console.log(e);
            });
    };

    const newEstoque = () => {
        setEstoque(initialEstoqueState);
        setSubmitted(false);
    };

    return (
        <div className="submit-form">
            {submitted ? (
                <div>
                    <h4>Você cadastrou com sucesso!</h4>
                    <button className="btn btn-success" onClick={newEstoque}>
                        Cadastrar
                    </button>
                </div>
            ) : (
                <div>
                    <div className="form-group">
                        <label htmlFor="idfuncionario">Funcionário</label>
                        <select
                            className="form-control"
                            id="idfuncionario"
                            required
                            value={Estoque.idfuncionario}
                            onChange={handleInputChange}
                            name="idfuncionario"
                        >
                            <option
                            selected
                            value="">
                                Selecione um Funcionario
                            </option>
                            {funcionarios.map((funcionario) => (
                                <option key={funcionario.idFuncionario} value={funcionario.idFuncionario}>
                                    {funcionario.nome}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group">
                    <label htmlFor="idpeca">Peça</label>
                        <select
                            className="form-control"
                            id="idpeca"
                            required
                            value={Estoque.idpeca}
                            onChange={handleInputChange}
                            name="idpeca"
                        >
                            <option
                            selected
                            value="">
                                Selecione uma peça
                            </option>
                            {pecas.map((peca) => (
                                <option key={peca.idPeca} value={peca.idPeca}>
                                    {peca.codigoInterno}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="quantidade">Quantidade</label>
                        <input
                            type="number"
                            className="form-control"
                            id="quantidade"
                            required
                            value={Estoque.quantidade}
                            onChange={handleInputChange}
                            name="quantidade"
                        />
                    </div>
                    <button onClick={saveEstoque} className="btn btn-success">
                        Cadastrar
                    </button>
                </div>
            )}
        </div>
    );
};

export default AddEstoque;
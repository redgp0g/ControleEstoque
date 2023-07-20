import React, { useState } from "react";
import AlertaEstoqueDataService from "../services/AlertaEstoqueService";
import { format } from 'date-fns';

const AddAlertaEstoque = () => {
    const initialEstoqueState = {
        id: 0,
        setor: null,
        urgencia: null,
        data: format(new Date(), 'yyyy-MM-dd\'T\'HH:mm:ss'),
        peca: null,
        quantidade: null,
        entregue: false
    };
    const [Estoque, setAlertaEstoque] = useState(initialEstoqueState);
    const [submitted, setSubmitted] = useState(false);

    const handleInputChange = event => {
        const { name, value } = event.target;
        setAlertaEstoque({ ...Estoque, [name]: value });
    };

    const saveAlertaEstoque = () => {
        var data = {
            id: Estoque.id,
            setor: Estoque.setor,
            urgencia: Estoque.urgencia,
            data: Estoque.data,
            peca: Estoque.peca,
            quantidade: Estoque.quantidade,
            entregue: Estoque.entregue
        };
        console.log(Estoque);
        AlertaEstoqueDataService.create(data)
            .then(response => {
                setAlertaEstoque({
                    ...Estoque,
                    id: response.data.id,
                    setor: response.data.setor,
                    urgencia: response.data.urgencia,
                    data: response.data.data,
                    peca: response.data.peca,
                    quantidade: response.data.quantidade,
                    entregue: response.data.entregue
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
        setAlertaEstoque(initialEstoqueState);
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
                        <label htmlFor="urgencia">Qual o nível de urgencia?</label>
                        <select
                            className="form-control"
                            id="urgencia"
                            required
                            value={Estoque.urgencia}
                            onChange={handleInputChange}
                            name="urgencia"
                        >
                            <option
                                selected
                                value={null}>
                                Selecione a Urgência
                            </option>
                            <option
                                value="Urgente">
                                Urgente
                            </option>

                            <option
                                value="Pouco Urgente">
                                Pouco Urgente
                            </option>
                            <option
                                value="Não Urgente">
                                Não Urgente
                            </option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="setor">Setor</label>
                        <input
                            className="form-control"
                            id="setor"
                            required
                            value={Estoque.setor}
                            onChange={handleInputChange}
                            name="setor"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="peca">Código Peça</label>
                        <input
                            type="number"
                            className="form-control"
                            id="peca"
                            required
                            value={Estoque.peca}
                            onChange={handleInputChange}
                            name="peca"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="quantidade">Quantidade Necessária de caixas</label>
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
                    <button onClick={saveAlertaEstoque} className="btn btn-success">
                        Cadastrar
                    </button>
                </div>
            )}
        </div>
    );
};

export default AddAlertaEstoque;
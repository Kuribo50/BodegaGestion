// src/components/administracion/ActualizarStockMinimoModal.js

import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { FaSave, FaTimes, FaEdit, FaSearch } from 'react-icons/fa';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { fetchArticulos, actualizarStockMinimo } from '@/services/api'; // Asegúrate de que la ruta es correcta

// Configurar el elemento raíz para accesibilidad con react-modal
Modal.setAppElement('#__next');

const MySwal = withReactContent(Swal);

const ActualizarStockMinimoModal = ({ isOpen, onRequestClose }) => {
    const [articulos, setArticulos] = useState([]);
    const [filteredArticulos, setFilteredArticulos] = useState([]);
    const [editingId, setEditingId] = useState(null);
    const [editedStockMinimo, setEditedStockMinimo] = useState('');
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    // Carga todos los artículos al abrir el modal
    const fetchArticulosData = async () => {
        setLoading(true);
        try {
            const data = await fetchArticulos();
            setArticulos(data);
            setFilteredArticulos(data);
        } catch (error) {
            console.error('Fetch Articulos Error:', error);
            MySwal.fire({
                icon: 'error',
                title: 'Error',
                text: 'No se pudieron cargar los artículos.',
            });
        } finally {
            setLoading(false);
        }
    };

    // Filtra artículos según el término de búsqueda
    const handleSearch = (e) => {
        const term = e.target.value;
        setSearchTerm(term);
        const filtered = articulos.filter((art) =>
            art.nombre.toLowerCase().includes(term.toLowerCase())
        );
        setFilteredArticulos(filtered);
    };

    // Cada vez que se abra el modal
    useEffect(() => {
        if (isOpen) {
            fetchArticulosData();
            setEditingId(null);
            setEditedStockMinimo('');
            setSearchTerm('');
        }
    }, [isOpen]);

    // Función que inicia la edición de un artículo
    const handleEdit = (articulo) => {
        setEditingId(articulo.id);
        setEditedStockMinimo(
            articulo.stock_minimo !== null && articulo.stock_minimo !== undefined
                ? String(articulo.stock_minimo)
                : ''
        );
    };

    // Guardar cambios de stock mínimo
    const handleSave = async (id) => {
        if (editedStockMinimo === '') {
            MySwal.fire({
                icon: 'error',
                title: 'Error',
                text: 'El stock mínimo no puede estar vacío.',
            });
            return;
        }

        const stockMinimoNumber = Number(editedStockMinimo);
        if (isNaN(stockMinimoNumber) || stockMinimoNumber < 0) {
            MySwal.fire({
                icon: 'error',
                title: 'Error',
                text: 'El stock mínimo debe ser un número válido y no negativo.',
            });
            return;
        }

        try {
            await actualizarStockMinimo(id, stockMinimoNumber);
            // Actualizar la lista local
            const updatedList = articulos.map((art) =>
                art.id === id ? { ...art, stock_minimo: stockMinimoNumber } : art
            );
            setArticulos(updatedList);
            setFilteredArticulos(
                updatedList.filter((art) =>
                    art.nombre.toLowerCase().includes(searchTerm.toLowerCase())
                )
            );

            setEditingId(null);
            setEditedStockMinimo('');
            MySwal.fire({
                icon: 'success',
                title: 'Éxito',
                text: 'Stock mínimo actualizado correctamente.',
            });
        } catch (error) {
            console.error('Handle Save Error:', error);
            if (error.response) {
                // La solicitud fue hecha y el servidor respondió con un código de estado
                MySwal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: error.response.data.error || 'No se pudo actualizar el stock mínimo.',
                });
            } else if (error.request) {
                // La solicitud fue hecha pero no se recibió respuesta
                MySwal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'No se recibió respuesta del servidor.',
                });
            } else {
                // Algo pasó al configurar la solicitud
                MySwal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Ocurrió un error al intentar actualizar el stock mínimo.',
                });
            }
        }
    };

    // Render principal
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel="Actualizar Stock Mínimo"
            className="bg-white rounded-xl shadow-xl w-full max-w-5xl mx-auto my-8 p-6 outline-none"
            overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
        >
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold text-gray-800">Actualizar Stock Mínimo</h2>
                <button
                    onClick={onRequestClose}
                    className="text-gray-500 hover:text-gray-700"
                >
                    <FaTimes size={24} />
                </button>
            </div>

            <div className="mb-4 flex items-center">
                <input
                    type="text"
                    placeholder="Buscar artículo..."
                    value={searchTerm}
                    onChange={handleSearch}
                    className="p-3 border border-gray-300 rounded-md w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <FaSearch className="ml-2 text-gray-500" />
            </div>

            {loading ? (
                <p className="text-center text-lg text-gray-600">Cargando artículos...</p>
            ) : (
                <div className="overflow-x-auto">
                    <div className="overflow-y-auto max-h-96">
                        <table className="min-w-full bg-white">
                            <thead>
                                <tr className="bg-blue-100 sticky top-0">
                                    <th className="py-3 px-6 text-left text-sm font-medium text-gray-700">Nombre</th>
                                    <th className="py-3 px-6 text-left text-sm font-medium text-gray-700">Stock Actual</th>
                                    <th className="py-3 px-6 text-left text-sm font-medium text-gray-700">Stock Mínimo</th>
                                    <th className="py-3 px-6 text-center text-sm font-medium text-gray-700">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredArticulos.map((art) => (
                                    <tr key={art.id} className="hover:bg-gray-50">
                                        <td className="py-3 px-6 text-sm text-gray-700">
                                            {art.nombre}
                                        </td>
                                        <td className="py-3 px-6 text-sm text-gray-700">
                                            {art.stock_actual}
                                        </td>
                                        <td className="py-3 px-6 text-sm text-gray-700">
                                            {editingId === art.id ? (
                                                <input
                                                    type="number"
                                                    value={editedStockMinimo}
                                                    onChange={(e) => setEditedStockMinimo(e.target.value)}
                                                    className="p-2 border border-gray-300 rounded-md w-full"
                                                />
                                            ) : (
                                                art.stock_minimo ?? 0
                                            )}
                                        </td>
                                        <td className="py-3 px-6 text-center space-x-2">
                                            {editingId === art.id ? (
                                                <>
                                                    <button
                                                        onClick={() => handleSave(art.id)}
                                                        className="text-green-500 hover:text-green-700"
                                                        title="Guardar"
                                                    >
                                                        <FaSave size={18} />
                                                    </button>
                                                    <button
                                                        onClick={() => {
                                                            setEditingId(null);
                                                            setEditedStockMinimo('');
                                                        }}
                                                        className="text-red-500 hover:text-red-700"
                                                        title="Cancelar"
                                                    >
                                                        <FaTimes size={18} />
                                                    </button>
                                                </>
                                            ) : (
                                                <button
                                                    onClick={() => handleEdit(art)}
                                                    className="text-blue-500 hover:text-blue-700"
                                                    title="Editar Stock Mínimo"
                                                >
                                                    <FaEdit size={18} />
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ))}

                                {filteredArticulos.length === 0 && (
                                    <tr>
                                        <td colSpan="4" className="py-4 text-center text-gray-600">
                                            No se encontraron artículos.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </Modal>
    );
};

export default ActualizarStockMinimoModal;
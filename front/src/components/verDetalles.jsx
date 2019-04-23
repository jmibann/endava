// {campo.status === 'Approbed HR'
//                           ? <td className='tableHeading'>
//                             <button type="button" className="btn boton btn-primaryList">Assign Sist.
//                             </button>
//                           </td>
//                           : campo.status === 'Tech Approved'
//                             ? <td className='tableHeading'>
//                               <button type="button" className="btn boton btn-primaryList" data-toggle="modal" data-target=".bd-example-modal-sm">Generate report
//                               </button>
//                               <div className="modal fade bd-example-modal-sm" tabIndex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true">
//                                 <div className="modal-dialog modal-sm">
//                                   <div className="modal-content">
//                                     Selecciona al entrevistador:
//                                     {entrevistadoresSist.map((entrevistador, index = 0) => (
//                                       <div key={index++} className="list-group">
//                                         <div className="list-group">
//                                           <a className="list-group-item list-group-item-action" onClick={() => this.setState({ entrevistador })}>{entrevistador}</a>
//                                         </div>
//                                       </div>)
//                                     )}
//                                   </div>
//                                 </div>
//                               </div>
//                             </td>
//                             : campo.status === 'New'
//                               ? <td className='tableHeading'>
//                                 <button type="button" className="btn boton btn-primaryList" data-toggle="modal" data-target=".bd-example-modal-sm">Assign Hr.
//                                 </button>
//                                 <div className="modal fade bd-example-modal-sm" tabIndex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true">
//                                   <div className="modal-dialog modal-sm">
//                                     <div className="modal-content">
//                                       Selecciona al entrevistador:
//                                       {this.props.users.map((entrevistador, index = 0) => (
//                                         <div key={index++} className="list-group">
//                                           <div className="list-group">
//                                             <a className="list-group-item list-group-item-action" onClick={() => this.setState({ entrevistador: entrevistador.id })}>{entrevistador.nombre}</a>
//                                           </div>
//                                         </div>)
//                                       )}
//                                     </div>
//                                   </div>
//                                 </div>
//                               </td>
//                               : <td className='tableHeading'>
//                                 <button type="button" className="btn boton btn-primaryList">Go to the pingo
//                                 </button>
//                               </td>}
//                       </tr>
//                     </tbody>
//                   )
//                   ;
//                 };
//               })}
//             </table>
//           </div>
//         </div>

import React from 'react'
import { useDispatch } from 'react-redux';
import { actionChangeWmsLayerVisibility } from '../../redux/action/wms';
import { useAppSelector } from '../../redux/hooks'
import './Sidebar.scss';
export default function Sidebar() {
    const serviceList = useAppSelector(state => state.wms.serviceList);
    const dispatch = useDispatch()

    const changeVisibility = (serviceId: number, layerId: number, visible: boolean) => {
        dispatch(
            actionChangeWmsLayerVisibility(serviceId, layerId, visible)
        )
    }

    return (
        <div className='Sidebar'>{
            serviceList.map((ss, index) => {
                return <div className='service' key={ss.id}>
                    <h4 className='title'>{ss.alias}</h4>
                    <div className='list'>
                        {ss.layers.map(l =>
                            <label key={l.id}>
                                <span>{l.alias}</span>
                                <input
                                    type="checkbox"
                                    checked={l.visible}
                                    onChange={(e) => changeVisibility(ss.id, l.id, e.target.checked)}
                                />
                            </label>)
                        }
                    </div>
                </div>
            })
        }
        </div>
    )
}

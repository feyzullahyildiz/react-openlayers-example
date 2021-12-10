import React from 'react'
import { useDispatch } from 'react-redux';
import { actionChangeWmsLayerVisibility } from '../redux/action/wms';
import { useAppSelector } from '../redux/hooks'

export default function Sidebar() {
    const layers = useAppSelector(state => state.wms.layers);
    const dispatch = useDispatch()

    const changeVisibility = (index: number, visible: boolean) => {
        dispatch(
            actionChangeWmsLayerVisibility(index, visible)
        )
    }

    return (
        <div>
            {layers.map((l, index) =>
                <label key={index}>
                    {l.layername.join(' ')}
                    <input
                    type="checkbox"
                    checked={l.visible}
                    onChange={e => changeVisibility(index, e.target.checked)}
                    />
                </label>
            )}
        </div>
    )
}

import { Picker, Popup, Search } from 'react-vant'
import { cityColumns } from '@/utils/cityList';
import { useEffect, useMemo, useState } from 'react';
import './index.css';

export default function CityPicker(props: { isShow: boolean, cityValue?: string; sendVal: (data: string) => void, onClose: (data?: string) => void }) {
    const { isShow, onClose, sendVal } = props

    const fullCityList = useMemo(
        () => cityColumns.map(v => v.text).map(v => v.replace('市', '')),
        []
    );

    const [columns, setColumns] = useState<string[]>(fullCityList)
    const [value, setValue] = useState<string>('')
    const [input, setInput] = useState<string>('')

    useEffect(() => {
        if (isShow) {
            if (props.cityValue) {
                setValue(props.cityValue)
            }
            setInput('');
            setColumns(fullCityList);
        }
    }, [isShow, fullCityList]);

    const handleSearch = (v: string) => {
        setInput(v);
        if (v.trim()) {
            const filtered = fullCityList.filter((city: string) => city.includes(v));
            setColumns(filtered);
        } else {
            setColumns(fullCityList);
        }
    }

    const handleConfirm = (v: string) => {
        setColumns(fullCityList);
        setInput('');
        setValue(v);
        sendVal(v);
        onClose();
    }

    return (
        <Popup
            visible={isShow}
            position="bottom"
            style={{ height: '50%' }}
            onClose={onClose}
        >
            <Search
                background="#fdfdfd"
                value={input}
                onChange={handleSearch}
                placeholder="请输入搜索城市"
            />
            <Picker
                columns={columns}
                title="选择城市"
                showToolbar
                visibleItemCount={6}
                value={value}
                onCancel={onClose}
                onChange={(v: string) => setValue(v)}
                onConfirm={handleConfirm}
            />
        </Popup>
    )
}
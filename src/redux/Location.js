import { useSelect, useDispatch } from '@wordpress/data';

export default () => {
    const store = 'Weather-report';

    const location = useSelect((select) => {
        return select(store).getLocation();
    }, []);

    const { setLocation } = useDispatch(store);

    return (
        <>
            Location: <p type='text'>{location}</p>
        </>
    );
};
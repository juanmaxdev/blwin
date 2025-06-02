import Button from '@mui/material/Button';

const BotonLetra = ({
    letra,
    disabled,
    onClick
}: {
    letra?: string
    disabled?: boolean
    onClick?: () => void
}
) => {

    return (
        <div>
            <Button variant="outlined" disabled={disabled} size="large" onClick={onClick}>
                {letra}
            </Button>
        </div>
    );

};

export default BotonLetra;

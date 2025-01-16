import { Box, Container, Card, TextField, Button } from '@mui/material';
import Logo from '../../assets/pharmacyicon.png';

export default function SignInForm() {
    ;

    return (
        <Container maxWidth="xs">
            <Card sx={{ p: 2, mt: 5, mb: 2, borderRadius: 2 }}>
                <Box display="flex" justifyContent="center" alignItems="center" className="bg-gray">
                    <div className='flex flex-col space-y-4'>
                        <img src={Logo} alt="Logo" style={{ width: 'auto', height: '250px', alignItems: "center", justifyContent: "center" }} />
                        <label className='font-bold text-lg text-center pb-4'>Sign in to medicare</label>
                        <div className='pb-6'>
                            <TextField className='w-full'
                                required
                                id="standard-required"
                                label="User Name"
                                defaultValue="Input User Name"
                            />
                        </div>
                        <div className='my-4'>
                            <TextField className='w-full'
                                required
                                id="standard-required"
                                label="Password"
                                defaultValue="Input Password"
                            />
                        </div>
                        <div>
                            <div className='mb-4'>
                                <Button
                                    className='w-full bg-green-900'
                                    variant="contained"
                                >
                                    Sign In
                                </Button>
                            </div>
                            <label>Don't have an account?  <Button href="signUp" color="primary">
                                Sign up
                            </Button></label>
                        </div>
                    </div>
                </Box>
            </Card>
        </Container>
    );
}



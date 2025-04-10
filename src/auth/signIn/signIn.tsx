import { Box, Container, Card, TextField, Button } from '@mui/material';
import Logo from '../../assets/pharmacyicon.png';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../redux-store/stores/store';
import { useForm } from 'react-hook-form';
import { signIn } from '../../shared/service/userSetting';
import { useNavigate } from 'react-router-dom';
import { toast, Toaster } from "sonner";

export default function SignInForm() {
    const { success } = useSelector((state: any) => state.auth);
    const dispath :AppDispatch = useDispatch();
    const {register , handleSubmit , formState:{isDirty , isValid , errors}} = useForm({mode:'onChange'});
    const navigate = useNavigate();

        const submitForm = async (payload:any) => {
            try {
                const response = await dispath(signIn(payload)).unwrap();
                toast.success("Login successful! 🎉");

                navigate("/"); 
            } catch (error) {
                toast.error("Login failed. Please check your credentials.");
                console.error("Login failed:", error);
            }
        }
        
    return (
        <Container maxWidth="xs">
            <Card sx={{ p: 2, mt: 5, mb: 2, borderRadius: 2 }}>
                <Box display="flex" justifyContent="center" alignItems="center" className="bg-gray">
                    <div className='flex flex-col space-y-4'>
                        <form onSubmit={handleSubmit(submitForm)} className='flex flex-col space-y-4'>
                        <img src={Logo} alt="Logo" style={{ width: 'auto', height: '250px', alignItems: "center", justifyContent: "center" }} />
                        <label className='font-bold text-lg text-center pb-4'>Sign in to medicare</label>
                        <div className='pb-6'>
                            <TextField className='w-full'
                                required
                                id="pharmacyName"
                                label="Pharmarcy Name"
                                placeholder="pharmacy Name"
                                {...register('Pharmarcy_name',{required:'Pharmacy Name is required'})}
                            />
                        </div>
                        <div className='my-4'>
                            <TextField className='w-full'
                                required
                                id="standard-required"
                                label="Password"
                                placeholder="Password"
                                {...register('password',{required:'Password is required'})}
                            />
                        </div>
                        <div>
                            <div className='mb-4'>
                                <Button sx={{ backgroundColor: '#064e3b' }} type='submit' className='w-full text-white' variant="contained">
                                    Sign In
                                </Button>
                            </div>
                            <label>Don't have an account?  <Button href="signUp" color="primary">
                                Sign up
                            </Button></label>
                        </div>
                    </form>
                    </div>
                </Box>
            </Card>
        </Container>
    );
}



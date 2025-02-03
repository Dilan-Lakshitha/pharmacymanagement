import { Box, Container, Card, TextField, Button } from '@mui/material';
import Logo from '../../assets/pharmacyicon.png';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../redux-store/stores/store';
import { useForm } from 'react-hook-form';
import { signUp } from '../../shared/service/userSetting';
import { toast, Toaster } from "sonner";

export default function SignUpForm() {
    const { success } = useSelector((state: any) => state.auth);
    const dispath :AppDispatch = useDispatch();
    const {register , handleSubmit , formState:{isDirty , isValid , errors}} = useForm({mode:'onChange'});  

    const submitForm = async (payload:any) => {
        try {
        toast.success("Pharmarcy added successful! 🎉");
        dispath(signUp(payload));
        }catch{
            toast.error("Pharmarcy added failed. Please check your network.");
        }
    }
    
    return (
        <Container maxWidth="xs">
            <Card sx={{ p: 2, mt: 2, mb: 2, borderRadius: 2 }}>
                <Box display="flex" justifyContent="center" alignItems="center" className="bg-gray">
                    <div className='flex flex-col space-y-4'>
                        <form onSubmit={handleSubmit(submitForm)} className='flex flex-col space-y-4'>
                        <img src={Logo} alt="Logo" style={{ width: 'auto', height: '250px', alignItems: "center", justifyContent: "center" }} />
                        <label className='font-bold text-lg text-center pb-4'>Sign up</label>
                        <label className='font-bold text-lg text-center pb-4'>Already have an account?<Button href="/" color="primary"> Sign in </Button></label>
                        <div className='pb-6'>
                            <TextField className='w-full'
                                required
                                id="standard-required"
                                label="Pharmarcy Name"
                                placeholder="Pharmacy Name"
                                {...register('pharmacyName',{required:'Pharmacy Name is required'})}
                            />
                        </div>
                        <div className='my-4 pb-6'>
                            <TextField className='w-full'
                                required
                                id="standard-required"
                                label="Email"
                                placeholder="Email"
                                {...register('email',{required:'Email is required'})}
                            />
                        </div>
                        <div className='my-4 pb-6'>
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
                                <Button type='submit' sx={{ backgroundColor: '#064e3b' }}
                                    className='w-full bg-green-900'
                                    variant="contained"
                                >
                                    Sign up
                                </Button>
                            </div>
                        </div>
                    </form> 
                    </div>
                </Box>
            </Card>
        </Container>
    );
}


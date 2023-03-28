import {Box, Typography} from "@mui/material"

export default function Header() {
    return(
       <Box component="header" sx={{width:"100vh", p:1,pl:3}} >
            <Typography variant='h2' sx={{fontWeight: 700}}>Droame</Typography>
       </Box>
    )
}
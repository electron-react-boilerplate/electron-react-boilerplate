import React from 'react';
import { fade, createStyles, Theme, makeStyles } from '@material-ui/core/styles';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';

import ReactCodeInput from 'react-verification-code-input';


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            background: 'transparent', 
            boxShadow: 'none'
        },
        bullet: {
            display: 'inline-block',
            margin: '0 2px',
            transform: 'scale(0.8)',
        },
        title: {
            fontSize: 14,
        },
        pos: {
            marginBottom: 16,
        },
        form: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        action: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            // backgroundColor: fade(theme.palette.common.black, 0.5),

        },
        header: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'left',
            padding: '2% 2% 2% 8%'

        },
        form_item: {
            background: 'transparent', boxShadow: 'none',
            padding: '2%'
        },
    }),
);

export default function PinNumber() {
    const classes = useStyles();
    let tgClient;

    function submitPin(event: any){
        event.preventDefault();
        console.log("submitPin")
       
    }

    const props = {
        className: 'ReactCodeInput',
        inputStyle: {
          fontFamily: 'monospace',
          margin:  '4px',
          MozAppearance: 'textfield',
          width: '15px',
          borderRadius: '3px',
          fontSize: '14px',
          height: '26px',
          paddingLeft: '7px',
          backgroundColor: 'black',
          color: 'lightskyblue',
          border: '1px solid lightskyblue'
        }
      }

    return (
        
        <Tooltip title="Check your telegram app (mobile or web) for authentication code">
            <Card className={classes.root} variant="outlined">
                <CardActionArea>
                    <Typography className={classes.header} variant="h6" component="h2">
                        Authentication Code
                    </Typography>
                    <CardContent className={classes.form}>
                        <form noValidate autoComplete="off">
                            <div className={classes.form_item}>
                                <ReactCodeInput type='number' fields={5} {...props} />
                            </div>
                        </form>
                    </CardContent>
                </CardActionArea>

                <CardActions className={classes.action}>
                    <Button size="small">Clear</Button>
                    <Button size="small">Resend</Button>
                    <Button size="small" onClick={submitPin} >Submit</Button>
                </CardActions>
            </Card>
        </Tooltip>

    );
}


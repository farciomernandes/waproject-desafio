/* eslint-disable react/jsx-no-bind */
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import CardContent from '@material-ui/core/CardContent';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Typography from '@material-ui/core/Typography';
import Toolbar from 'components/Layout/Toolbar';
import ToolbarTabs from 'components/Layout/ToolbarTabs';
import React, { Fragment, memo } from 'react';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import TextField from '@material-ui/core/TextField';
import { useHistory } from 'react-router-dom';
import requestService from '../../../services/request';
import { useFormik } from 'formik';
import Toast from '../../Shared/Toast';

const useStyle = makeStyles(theme => ({
  cardActions: {
    justifyContent: 'flex-end'
  },
  cardItens: {
    marginTop: 20,
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-around',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 12
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,

    elevation: 24,
    padding: 20
  },
  cardContextStyle: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    heigth: '100%',
    marginLeft: 20
  },
  cardContextDescription: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    heigth: '100%'
  },
  bigTitle: {
    fontWeight: 'bold',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  descriptionArea: {
    minHeight: '200px',
    width: '500px'
  },
  textColor: {
    marginLeft: '5px',
    fontSize: '14px',
    color: '#3A5885',
    fontWeight: 'bold'
  },
  centerTitle: {
    width: '100%',
    textAling: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex'
  },
  btnClass: {
    height: '100%',
    display: 'flex',
    alignSelf: 'center'
  }
}));

const NewRequest = memo((props: {}) => {
  const classes = useStyle(props);
  const history = useHistory();

  const { getFieldProps, handleSubmit, isValid } = useFormik({
    initialValues: {
      description: '',
      title: '',
      price: 0,
      quantity: 1
    },
    onSubmit: (values, bag) => {
      const data = {
        description: values.description,
        title: values.title,
        price: Number(values.price),
        quantity: Number(values.quantity)
      };
      requestService.create(data).then(() => {
        Toast.show('Pedido realizado com sucesso!');
      });
    }
  });

  const description = getFieldProps('description');
  const title = getFieldProps('title');
  const price = getFieldProps('price');
  const quantity = getFieldProps('quantity');

  return (
    <Fragment>
      <form onSubmit={handleSubmit}>
        <Toolbar title='Extra' />
        <ToolbarTabs>
          <Tabs value={1} color='primary'>
            <Tab label='Meus pedidos' onClick={() => history.push('/request')} />
            <Tab label='Novo Pedido' />
          </Tabs>
        </ToolbarTabs>
        <Card className={classes.cardItens}>
          <CardContent className={classes.cardContextStyle}>
            <Typography gutterBottom className={classes.bigTitle}>
              <TextField required id='standard-required' label='Título do Pedido' type='text' {...title} />
            </Typography>
            <Typography variant='subtitle2' gutterBottom className={classes.bigTitle}>
              <TextField required id='standard-required' label='Valor:' {...price} />
              R$
            </Typography>
            <Typography variant='overline' gutterBottom className={classes.bigTitle}>
              <TextField required id='standard-required' label='Quatidade' {...quantity} />
            </Typography>
          </CardContent>
          <CardContent className={classes.cardContextStyle}>
            <Card>
              <Typography variant='h5' gutterBottom className={classes.centerTitle}>
                Descrição
              </Typography>
            </Card>
            <Card>
              <Card>
                <TextareaAutosize
                  className={classes.descriptionArea}
                  defaultValue='Escreva sua descrição aqui.'
                  {...description}
                />
              </Card>
            </Card>
          </CardContent>
          <Typography variant='h5' gutterBottom className={classes.btnClass}>
            <Button disabled={!isValid} type='submit' variant='contained' color='primary'>
              Enviar Pedido
            </Button>
          </Typography>
        </Card>
      </form>
    </Fragment>
  );
});
export default NewRequest;

/* eslint-disable linebreak-style */
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Toolbar from 'components/Layout/Toolbar';
import ToolbarTabs from 'components/Layout/ToolbarTabs';
import React, { Fragment, memo, useCallback, useState } from 'react';
import { useHistory } from 'react-router-dom';
import requestService from '../../../services/request';
import IRequest from 'interfaces/models/request';
import formatValue from '../../../helpers/formatValue';

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
    fontWeight: 'bold'
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
  }
}));

const Requests: React.FC = memo((props: {}) => {
  const classes = useStyle(props);
  const history = useHistory();
  const [pedidos, setPedidos] = useState<IRequest[]>([]);
  const [isRequest, setIsRequest] = useState('none');
  const serachRequest = useCallback(() => {
    async function loadProducts(): Promise<void> {
      const { data } = await requestService.index();
      setPedidos(
        data.map((dat: IRequest) => ({
          ...dat,
          price: Number(dat.price)
        }))
      );
      setIsRequest('block');
    }
    loadProducts();
  }, []);

  return (
    <Fragment>
      <Toolbar title='Extra' />
      <ToolbarTabs>
        <Tabs value={0} color='primary'>
          <Tab label='Meus pedidos' />
          <Tab label='Novo Pedido' onClick={() => history.push('/newrequest')} />
        </Tabs>
      </ToolbarTabs>

      <Button onClick={serachRequest}>Ver Pedidos</Button>
      <Card style={{ display: isRequest }}>
        {pedidos.map(pedido =>
          pedido ? (
            <Card className={classes.cardItens}>
              <CardContent className={classes.cardContextStyle}>
                <Typography variant='h5' gutterBottom className={classes.bigTitle}>
                  {pedido.title}
                </Typography>
                <Typography variant='overline' gutterBottom className={classes.bigTitle}>
                  Quantitade:
                  <Typography variant='overline' color='secondary' className={classes.textColor}>
                    {pedido.quantity}
                  </Typography>
                </Typography>
                <Typography variant='overline' gutterBottom className={classes.bigTitle}>
                  Valor unitário:
                  <Typography variant='overline' color='secondary' className={classes.textColor}>
                    {formatValue(pedido.price)}
                  </Typography>
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
                    <Typography variant='subtitle2' gutterBottom className={classes.bigTitle}>
                      {pedido.description}
                    </Typography>
                  </Card>
                </Card>
              </CardContent>
            </Card>
          ) : (
            <h1>Você não tem pedidos!</h1>
          )
        )}
      </Card>
    </Fragment>
  );
});
export default Requests;

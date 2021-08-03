import React, { useState  , useEffect} from 'react';
import { StyleSheet, View } from 'react-native';
import { Table, TableWrapper, Row, Rows, Col } from 'react-native-table-component';
import AppHeader from '../../components/AppHeader/AppHeader';
 const  Mesfacture = (props) => {
    const [state, setState] = useState({tableHead: ['', 'Head1', 'Head2', 'Head3'],
    tableTitle: ['Title', 'Title2', 'Title3', 'Title4'],
    tableData: [
        ['1', '2', '3'],
        ['a', 'b', 'c'],
        ['1', '2', '3'],
        ['a', 'b', 'c']
      ]});
 
      const Getallfacturefromservice = () => {
    
        try {
          Getallfacture()
            .then((responseData) => {
              if (responseData.length > 0) {
            
            // setState({...state ,tableData: responseData});
             console.log("dara")
              }
               else {
                Toast.show({
                  type: 'error',
                  position: 'bottom',
                  text1: 'error data',
                  visibilityTime: 3000,
                  autoHide: true,
                });
    
                console.log('error');
              }
            })
            .catch((error) => {
              console.error(error);
            });
        } catch (error) {
          console.log(error);
        }
    }
    useEffect(() => {
      Getallfacturefromservice()
     }, [])
    return (
        <View>
        <AppHeader
        headerTitle="xpr facture"
        leftIconMenu={false}
        rightIconMenu={true}
      />
      <View style={styles.container}>

        <Table>
          <Row data={state.tableHead} flexArr={[1, 2, 1, 1]} style={styles.head} textStyle={styles.text}/>
          <TableWrapper style={styles.wrapper}>
            <Col data={state.tableTitle} style={styles.title} heightArr={[28,28]} textStyle={styles.text}/>
            <Rows data={state.tableData} flexArr={[2, 1, 1]} style={styles.row} textStyle={styles.text}/>
          </TableWrapper>
        </Table>
      </View>
      </View>
    )
  }


const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
  head: {  height: 40,  backgroundColor: '#f1f8ff'  },
  wrapper: { flexDirection: 'row' },
  title: { flex: 1, backgroundColor: '#f6f8fa' },
  row: {  height: 28  },
  text: { textAlign: 'center' }
});
export default Mesfacture
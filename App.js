
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { ScrollView } from 'react-native-web';
import { supabase } from './conexao';

export default function App() {
  const [descricaoDigitada, setDescricaoDigitada] = useState("");
  const [valorDigitado, setValorDigitado] = useState("");
  const [dados, setDados] = useState([]);

//Função deletar dados no banco de dados
const deletarConta = async(id) =>{
    const {error} = await supabase.from("tb_contas")
    .delete().match({id})

    if(error){
      alert("Falha ao deletar!")
    }else{
      alert("Conta deletada com sucesso!")
      consultarDados()
    }
}
//Função para consultar os dados no Banco de Dados
const consultarDados = async()=>{
    const {data, error} = await supabase.from("tb_contas")
    .select("*");

    if(error){
      alert("Falha ao consultar os Dados!")
    }else{
      setDados(data);
    }
}
  
  // Criar uma função para inserir no Banco de dados
  const cadastrarConta = async(desc, vl)=>{
    if(desc == "" || vl == ""){
      alert("Preencha todos os campos!")
    }else{
      const {error} = await supabase.from("tb_contas")
      .insert({coluna_desc: desc, coluna_valor: vl, coluna_status: false});

      if(error){
        alert("Falha ao cadastrar!")
      }else{
        alert("Cadastrado com sucesso!")
        consultarDados()
      }
    }
  }
  //Chamar a função consultar dados quando o app for aberto
  useEffect (()=>{
    consultarDados();
  }, []);
  return (
    <View style={styles.container}>
      
      <Text style={{fontSize: 35}}>Contas a Pagar</Text>
      <TextInput
        style={styles.caixaDeTexto}
        placeholder='Descrição aqui'
        onChangeText={(texto)=>setDescricaoDigitada(texto)}
      />
      <TextInput
        style={styles.caixaDeTexto}
        placeholder='Valor aqui'
        onChangeText={(texto)=>setValorDigitado(texto)}
      />
      <Button
        title="Cadastrar"
        onPress={()=>{cadastrarConta(descricaoDigitada, valorDigitado)}}
      />
    <ScrollView style={{width: "100%"}}>

      {dados.map((item)=>(

      <View style={styles.caixaContas}>
        <Text>N° {item.id}</Text>
        <Text>{item.coluna_desc}</Text>
        <Text>R$ {item.coluna_valor}</Text>
        <Text>{item.coluna_status}</Text>
        <Button
          title= 'Excluir'
          onPress={()=>{deletarConta(item.id)}}
          />
      </View>
    ))}
    </ScrollView>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  caixaContas:{
    width: "90%",
    minHeight: 70,
    borderWidth: 1,
    borderColor: "#b2b2b2",
    borderRadius: 8,
    margin: 30,
    padding: 10
  },
  caixaDeTexto:{
    borderWidth: 1,
    width: "90%",
    padding: 10,
    margin: 15,
    borderRadius: 5
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    marginTop: 50
  },
});

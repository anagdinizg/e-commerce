class CepService { 
    static async fetchCep(cep) { 
        try { 
            const cleanCep = cep.replace(/\D/g, '')
            
            if (cleanCep.length !== 8) { 
                throw new Error('CEP deve conter 8 dígitos')
            } 
             
            const response = await fetch(`https://viacep.com.br/ws/${cleanCep}/json/`) 
            
            if (!response.ok) { 
                throw new Error('Erro na consulta do CEP') 
            } 
            
            const data = await response.json() 
            
            if (data.erro) { 
                throw new Error('CEP não encontrado') 
            } 
            
            return { 
                success: true, 
                data: { 
                    logradouro: data.logradouro || '', 
                    bairro: data.bairro || '', 
                    cidade: data.localidade || '', 
                    uf: data.uf || '', 
                    cep: data.cep || '', 
                }, 
            } 
        }   catch (error) { 
            return { 
                success: false, 
                error: error.message, 
            } 
        } 
    } 
} 

export default CepService
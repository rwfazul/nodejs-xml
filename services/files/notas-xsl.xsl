<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

	<xsl:output method="text" encoding="ISO-8859-1"/>
  
<xsl:template match="nfeProc/NFe/infNFe">
    <h4>Nota fiscal</h4>
      <h4>Dados da nota fiscal</h4>
      <ul>
        <li><b>Número:</b><xsl:value-of select="ide/nNF"/></li>
        <li><b>Data de emissão: </b><xsl:value-of select="ide/dEmi"/></li>
        <li><b>Operação: </b><xsl:value-of select="ide/natOp"/></li>
      </ul>
      <h4>Dados do emitente</h4>
      <ul>
        <li><b>Nome</b><xsl:value-of select="emit/xNome"/></li>
        <li><b>Nome Fantasia</b><xsl:value-of select="emit/xFant"/></li>
        <li><b>CNPJ</b><xsl:value-of select="emit/CNPJ"/></li>
      </ul>
      <h4>Dados do destinatário</h4>
      <ul>
        <li><b>Nome</b><xsl:value-of select="dest/xNome"/></li>
        <li><b>CPF</b><xsl:value-of select="dest/CPF"/></li>
      </ul>
      <h4>Produtos</h4>
    <table>
    <thead>
    					<tr>
						<th><b>Código produto</b></th>
						<th><b>Nome produto</b></th>
						<th><b>Valor unitário produto</b></th>
						<th><b>Quantidade produto</b></th>
					</tr>
				</thead>
									<tbody>
    <xsl:for-each select="det/prod">
						<tr>
							<th><xsl:value-of select="cProd"/></th>
							<th><xsl:value-of select="xProd"/></th>
							<th><xsl:value-of select="vUnTrib"/></th>
							<th><xsl:value-of select="qCom"/></th>
						</tr>
    </xsl:for-each>
    					</tbody>
				</table>
      <p><b>Valor total da nota: </b><xsl:value-of select="total/ICMSTot/vNF"/></p>
 
</xsl:template>
</xsl:stylesheet>
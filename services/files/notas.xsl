<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:x="http://www.portalfiscal.inf.br/nfe">

  <xsl:output method="html" omit-xml-declaration="no" encoding="UTF-8" indent="yes" />
  <xsl:template match="text()" priority="-1" /> 

  <xsl:template match="nfeProc/x:NFe/x:infNFe">
    <html>
      <head>
          <title>Nota</title>
          <link rel='stylesheet' href='/custom/stylesheets/style.css' />
          <link rel='stylesheet' href='/vendors/materialize/materialize.css' />
          <link type="text/css" rel="stylesheet" href="/vendors/materialize/style.css" />
          <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
      </head>
      <body>
        <header id="header" class="page-topbar">
            <div class="navbar-fixed">
                <nav class="navbar-color base-color">
                    <div class="nav-wrapper"></div>
                </nav>
            </div>
        </header>
        <section class="content">
        <div class="row">
        <div class="col s12">
          <h4 class="header">Nota fiscal</h4>
          <h4 class="header">Dados da nota fiscal</h4>
          <ul>
            <li><b>Número: </b> <xsl:value-of select="x:ide/x:nNF"/></li>
            <li><b>Data de emissão: </b> <xsl:value-of select="x:ide/x:dEmi"/></li>
            <li><b>Operação: </b> <xsl:value-of select="x:ide/x:natOp"/></li>
          </ul>
          <h4 class="header">Dados do emitente</h4>
          <ul>
            <li><b>Nome: </b> <xsl:value-of select="x:emit/x:xNome"/></li>
            <li><b>Nome Fantasia: </b> <xsl:value-of select="x:emit/x:xFant"/></li>
            <li><b>CNPJ: </b> <xsl:value-of select="x:emit/x:CNPJ"/></li>
          </ul>
          <h4 class="header">Dados do destinatário</h4>
          <ul>
            <li><b>Nome: </b> <xsl:value-of select="x:dest/x:xNome"/></li>
            <li><b>CPF: </b> <xsl:value-of select="x:dest/x:CPF"/></li>
          </ul>
          <h4 class="header">Produtos</h4>
          <table class="responsive-table striped">
            <thead>
              <tr>
                <th>Código produto</th>
                <th>Nome produto</th>
                <th>Quantidade produto</th>
                <th>Valor unitário produto</th>
              </tr>
            </thead>
            <tbody>
              <xsl:for-each select="x:det/x:prod">
                <tr>
                  <td><xsl:value-of select="x:cProd"/></td>
                  <td><xsl:value-of select="x:xProd"/></td>
                  <td><xsl:value-of select="x:qCom"/></td>
                  <td><xsl:value-of select="x:vUnTrib"/></td>
                </tr>
              </xsl:for-each>
              <tr>
                <td colspan="3"><b>Valor total da nota </b></td>
                <td><xsl:value-of select="x:total/x:ICMSTot/x:vNF"/></td>
              </tr>
            </tbody>
          </table>
        </div>
        </div>
        </section>

        <!-- Footer -->
        <footer class="page-footer base-color">
          <div class="footer-copyright">
            <div class="container">
              <span class="right hide-on-small-only">Copyright © 2018 | SI</span>
            </div>
          </div>
        </footer>
        <!-- /Footer -->
        <script src='/vendors/jquery/jquery.min.js'></script>
        <script src='/vendors/materialize/materialize.min.js'></script>
        <script src='/custom/index.js'></script>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
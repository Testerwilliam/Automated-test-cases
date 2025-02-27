describe("Facturacion",() => {

    it ("crear factura de compra ", () => {
    //ingresar al ERP
    cy.visit("https://app.clez.co/") 
    cy.get("#LoginForm_username").type("COMERCIAL")
    cy.get("#LoginForm_password").type("XXXXXXXXXXXX")
    cy.get(".boton").click()
    
    //ingresar a una usuario
    cy.get('#buscadorAfiliado').type("101909122x")
    cy.wait(1000)
    cy.get('.ul-filter').click()
    cy.get('.quick-nav-trigger').find('span').should('exist').and('be.visible');
    cy.get('.quick-nav-trigger').click()
    cy.get('#nav-flotante > ul > :nth-child(2) > a').click()
    cy.get('#select2-id_dominio_canal_ventas-container').type("asesor gym")
    cy.get('#select2-sucursal-container').type("clez comercial{enter}")
    cy.get('.col-lg-12 > .btn').click()

    //asignar plan
    cy.get('#actualizar').click()
    cy.get('#planes_ui').type('Mensu{downarrow}', { force: true }); // Simula escribir y luego navegar hacia abajo
    cy.wait(1000)
    cy.get('#ui-id-4').click()
    cy.wait(2000)
    cy.get('#agrega_producto_modal > .modal-dialog > .modal-content > .modal-footer > :nth-child(2) > .btn').click()
    cy.wait(2000)
    cy.get('.items > tbody > .odd > :nth-child(1)').should('have.text', 'MENSUALIDAD')
    cy.get('#forma_pago_mostrar').click()
    cy.get('#forma_pago_modal > .modal-dialog > .modal-content > .modal-footer > :nth-child(2) > .btn').click()
    cy.wait(500)
    cy.get('#lnkGeneraFactura').click()
    //cy.wait(2500)


    //verifications on the affiliate profile

    cy.visit("https://app.clez.co/") 
    cy.get("#LoginForm_username").type("COMERCIAL")
    cy.get("#LoginForm_password").type("XXXXXXXXXXXXX")
    cy.get(".boton").click() 
    cy.get('#buscadorAfiliado').type("101909122x")
    cy.wait(1000)
    cy.get('.ul-filter').click()
    cy.get('tbody > tr').eq(1).find('td').eq(1).should('have.text', 'MENSUALIDAD');


        //get currently date and compare
        //const fechaActual = new Date().toLocaleDateString('es-ES'); //convert date to texto
        //cy.get('tbody > :nth-child(1) > :nth-child(5)') .should('have.text', fechaActual); //>>>funcionando!<<<

    // Verify document creation

    cy.get('.tabs > :nth-child(6) > a').click()
    const fechaActual = new Date().toLocaleDateString('en-CA'); //formato canadiense
    cy.get('#facturas-tercero-grid > .items > tbody > :nth-child(1) > :nth-child(3)').should('include.text', fechaActual);

    //"Cancelar factura"
    cy.get(':nth-child(6) > .nav-toggle').click()
    cy.get('.nav-item.open > .sub-menu > :nth-child(11) > .nav-link').click()
    cy.get('#buscador').type('1019091228{downarrow}', { force: true });
    cy.wait(1000)
    cy.get('#ui-id-3').click()
    cy.wait(500)
    const fechaDeMañana = new Date();
    fechaDeMañana.setDate(fechaDeMañana.getDate() + 1);  // Sumar un día
    const fechaDeMañanaFormateada = fechaDeMañana.toLocaleDateString('en-CA');
    cy.get('#desde').type(fechaActual)
    cy.get('#hasta').type(fechaDeMañanaFormateada)
    cy.get('#generar').click()

    //"anular factura"
    cy.get('#yt1').then(($btn) => {
        const href = $btn.prop('href'); // We capture the URL of the link
        cy.visit(href); // We visit the URL directly
    
    //confirm cancellation
    cy.get('#observacion').type("prueba Automatizada")
    cy.get('#anular').click()
    
      });
});

})



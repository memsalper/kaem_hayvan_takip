
$(document).ready(function () {

    stateAnimal();
    irkList();
    cagList();

    $("#btnNews").click(function () {
        ajaxNews();
    })


    //Form.SetData('frmReceiptDocumentInsert', result.Data);

    function ajaxNews() {

        $("#divNews").html('<img src="../img/preloader.gif" style="width: 75px;" />');

        var country = $('#countryTxt').val();
        if (country === "") {
            country = "tr";
        }

        const pushData = {
            "country": country
        }

        // ajax model
        $.ajax({
            type: 'get',
            contentType: 'application/json',
            url: '/animal/joinDeneme',
            //data: JSON.stringify(pushData),
            success: function (data) {
                $("#divNews").html( tableCreate(data) );
                const count = data.length;
                $("#newH1").html("Animals - " + count);
            },
            error: function (error) {
                console.log(error)
            }
        })
    }



    ajaxNews();


    $("#modalButton").click(function () {
        $('#frmAminal').get(0).reset()
        $("#exampleModal").modal('show');
    })

    $('.btn-close').click(function (){
        $("#exampleModal").modal('hide');
    })

    $("#closeModal").click(function (){
        $("#exampleModal").modal('hide');
    })
    $("#frmAminal").submit(function(e) {

        e.preventDefault(); // avoid to execute the actual submit of the form.

        var form = $(this);
        var url = form.attr('action');
        var pushData =form.serializeArray();
        pushData=getFormData(pushData);

        debugger;

        $.ajax({
            type: "POST",
            contentType: 'application/json',
            url: url,
            data: JSON.stringify(pushData),// serializes the form's elements.
            success: function(data)
            {
                $("#exampleModal").modal('hide');
                ajaxNews(); // show response from the php script.
            }
        });


    });


})

function tableCreate( data ) {
    var html = '<table class="table table-hover">\n' +
        '  <thead>\n' +
        '    <tr>\n' +
        '      <th scope="col">aciklama</th>\n' +
        '      <th scope="col">dogumAgirlik</th>\n' +
        '      <th scope="col">dogumTarihi</th>\n' +
        '      <th scope="col">durumu</th>\n' +
        '      <th scope="col">isletmeNo</th>\n' +
        '      <th scope="col">stateAnimal</th>\n' +
        '      <th scope="col">ulusalNo</th>\n' +
        '      <th scope="col">cAdi</th>\n' +
        '      <th scope="col">iAdi</th>\n' +
        '      <th scope="col"></th>\n' +
        '    </tr>\n' +
        '  </thead>\n' +
        '  <tbody>'

    data.map( item => {
        html += '<tr>\n' +
            '      <th>'+item.aciklama+'</th>\n' +
            '      <td>'+item.dogumAgirlik+'</td>\n' +
            '      <td>'+item.dogumTarihi+'</td>\n' +
            '      <td>'+item.durumu+'</td>\n' +
            '      <th>'+item.isletmeNo+'</th>\n' +
            '      <td>'+item.stateAnimal+'</td>\n' +
            '      <td>'+item.ulusalNo+'</td>\n' +
            '      <td>'+item.cadi+'</td>\n' +
            '      <td>'+item.iadi+'</td>\n' +
            '      <td><button id="updateButton" class="btn btn-outline-primary btn-sm" onclick="updateAnimal('+item.id+')" >Düzenle</button></td>\n' +
            '    </tr>'
    })



    html += ' </tbody>\n' +
        '</table>'

    return html;
}

function searchGeneral(){
    const cadi = {
        "cadi": $("#countryTxt").val()
    }

    debugger;
    $.ajax({
        type: 'post',
        contentType: 'application/json',
        url: '/animal/searchAnimal',
        data:JSON.stringify(cadi),
        success: function (data) {
debugger;
            $("#divNews").html( tableCreate(data) );
            const count = data.length;
            $("#newH1").html("Animals - " + count);


        },
        error: function (error) {
            console.log(error)
        }
    })
}
function updateAnimal(id) {



    const pushData = {
        "id": id
    }
    // ajax model
    $.ajax({
        type: 'post',
        contentType: 'application/json',
        url: '/animal/updateAnimal',
        data: JSON.stringify(pushData),
        success: function (data) {
            $('#frmAminal').get(0).reset();
            $("#exampleModal").modal('show');
            var state=data["stateAnimal"];

            $("#stateAnimal > option").each(function() {
                if(this.text === state)
                    $(this).prop('selected', true);
            });
            $('#cag').val(data["cag"].cid).attr("selected", "selected");
            $('#irk').val(data["irk"].iid).attr("selected", "selected");
            var status=data.status.toString();
            data.skcAgirlik= data.skcAgirlik.toString();
            $('#skcAgirlik').val(data.skcAgirlik);
            data.dogumAgirlik= data.dogumAgirlik.toString();
            $('#status').val(status).attr("selected", "selected");
            var dogumTarihi= data.dogumTarihi;
            $('#dogumTarihi').val(dogumTarihi);
            var tartimTarihi= data.tartimTarihi;
            $('#tartimTarihi').val(tartimTarihi);

           // $("#select option[value=3]").attr('selected', 'selected');

            Form.SetData('frmAminal', data);


        },
        error: function (error) {
            console.log(error)
        }
    })
}

function stateAnimal() {
    // ajax model
    $.ajax({
        type: 'get',
        contentType: 'application/json',
        url: '/animal/stateAnimal',
        success: function (data) {
            var i=0;
            var html="";
            data.map( item => {
                    html += '<option value="'+i+'">'+item+'</option>\n';
                    i++;
            });

            $("#stateAnimal").html(html);
        },
        error: function (error) {
            console.log(error)
        }
    })
}

function irkList() {
    // ajax model
    $.ajax({
        type: 'get',
        contentType: 'application/json',
        url: '/irk/list',
        success: function (data) {
            var i=0;
            var html="";
            data.map( item => {
                html += '<option value="'+item.iid+'">'+item.iadi+'</option>\n';
                i++;
            });

            $("#irk").html(html);
        },
        error: function (error) {
            console.log(error)
        }
    })
}

function cagList() {
    // ajax model
    $.ajax({
        type: 'get',
        contentType: 'application/json',
        url: '/cag/list',
        success: function (data) {
            var i=0;
            var html="";
            data.map( item => {
                html += '<option value="'+item.cid+'">'+item.cadi+'</option>\n';
                i++;
            });

            $("#cag").html(html);
        },
        error: function (error) {
            console.log(error)
        }
    })
}
var Form = {
    GetData: function (formId) {
        var $model = {};
        return Form.GetDataWithModel(formId, $model);
    },
    GetDataWithModel: function (formId, model) {
        var $model = model;
        $("#" + formId + " [name]").each(function (inputIndex, input) {
            var $prop = $(this).attr('name');
            if ($prop != null && $prop != undefined) {
                switch (input.type) {
                    case 'text':
                        if ($(this).val() != "") {
                            if ($(input).hasClass('datetime') || $(input).hasClass('datetime2') || $(input).data('type') == "datetime") {
                                $model[$prop] = Data.DateTimeToJson($(this).val());
                            } else {
                                $model[$prop] = $(this).val();
                            };
                        };
                        break;
                    case 'password':
                        if ($(this).val() != "") {
                            $model[$prop] = $(this).val();
                        };
                        break;
                    case 'select-multiple':
                        if ($(this).val() != "" && $(this).val() != 0) {
                            $model[$prop] = $(this).val();
                        };
                        break;
                    case 'select-one':
                        if ($(this).val() != "" && Number($(this).val()) > 0) {
                            $model[$prop] = $(this).val();
                        };
                        break;
                    case 'textarea':
                        if ($(this).val() != "") {
                            $model[$prop] = $(this).val();
                        };
                        break;
                    case 'checkbox':
                        if ($(this).is(':checked')) {
                            $model[$prop] = true;
                        } else {
                            $model[$prop] = false;
                        };
                        break;
                    case 'radio':
                        if ($(this).is(':checked')) {
                            $model[$prop] = $(this).val();
                        };
                        break;
                    case 'hidden':
                        if ($(this).val() != "") {
                            $model[$prop] = $(this).val();
                        };
                        break;
                };
            };
        });
        return $model;
    },
    SetData: function (formId, data) {
        //Result nesnesinin property bilgilerini toplar.
        var $props = [];
        for (var prop in data) {
            $props.push(prop);
        };
        //Form icerisindeki prop data nesnelerinde dolasir ve result nesnesinin property bilgisi ile eslestigi kontrole veri baglar.
        $("#" + formId + " [name]").each(function (inputIndex, input) {
            $.each($props, function (propIndex, prop) {
                if ($(input).attr('name') == prop) {
                    switch (input.type) {
                        case 'text':
                        case 'password':
                            if (data[prop] != null && data[prop] != "") {
                                if ($(input).hasClass('tags')) {
                                    var $tags = data[prop].toString().split(',');
                                    $.each($tags, function (i, tag) {
                                        $(input).addTag(tag);
                                    });
                                } else if ($(input).hasClass('datetime') || $(input).hasClass('datetime2') || $(input).data('type') == "datetime") {
                                   debugger;
                                    $(input).datepicker("setDate", Data.DateTimeAutoFormat(data[prop]));
                                } else if ($(input).data('type') == "decimal") {
                                    var $decimalValue = data[prop];
                                    if (!isNaN(Number(data[prop]))) {
                                        $decimalValue = Number(data[prop]).toFixed(2);
                                    };
                                    $(input).val($decimalValue).trigger('input');
                                } else {
                                    $(input).val(data[prop]);
                                };
                            };
                            break;
                        case 'textarea':
                            if (data[prop] != null && data[prop] != "") {
                                $(input).val(data[prop]);
                            };
                            break;
                        case 'checkbox':
                            if (data[prop] != null) {
                                $(input).prop('checked', data[prop]);
                                $(input).val(data[prop]);
                                $.uniform.update(input);
                                $(input).change();
                            };
                            break;
                        case 'radio':
                            if (data[prop] != null) {
                                var $radio = $('input[type="radio"][name="' + prop + '"][value="' + String(data[prop]) + '"]');
                                $radio.prop('checked', true);
                                if ($radio.closest('label').length > 0) {
                                    $radio.closest('.radio-list').find('span').each(function (i2, span) {
                                        $(span).removeClass('checked');
                                    });
                                    $radio.closest('label').parent().click();
                                    if ($radio.data('firstchecked') == null || $radio.data('firstchecked') == undefined) {
                                        $radio.data('firstchecked', "true");
                                        $radio.change();
                                    };
                                    $.uniform.update($radio);
                                };
                            };
                            break;
                        case 'file':
                            break;
                        case 'hidden':
                            if (data[prop] != null && data[prop] != "") {
                                $(input).val(data[prop]);
                            };
                            break;
                    };
                };
            });
        });
    },
    Reset: function (formId) {
        $formPostValidate.reset();
        $('#' + formId + ' :input').not(':button').each(function () {
            switch (this.type) {
                case 'text':
                    if ($(this).hasClass('tags')) {
                        var $tagInput = $(this);
                        var $tags = $(this).val().split(',');
                        if ($tags.length > 0) {
                            $.each($tags, function (i, tag) {
                                $($tagInput).removeTag(tag);
                            });
                        };
                    } else {
                        $(this).val('');
                    };
                    break;
                case 'password':
                    $(this).val('');
                    break;
                case 'textarea':
                    $(this).val('');
                    break;
                case 'checkbox':
                    $(this).prop('checked', false);
                    $.uniform.update($(this));
                    break;
                case 'radio':
                    $(this).removeData('firstchecked');
                    if (Boolean($(this).data('default'))) {
                        $(this).prop('checked', true);
                        if ($(this).closest('label').length > 0) {
                            $(this).closest('.radio-list').find('span').each(function () {
                                $(this).removeClass('checked');
                            });
                            $(this).closest('label').parent().click();
                            $(this).change();
                            $.uniform.update($(this));
                        };
                    };
                    break;
                case 'file':
                    $(this).replaceWith($(this).val('').clone(true));
                    break;
            };
        });
        $("#" + formId + " table > tbody").empty();
    },
    Post: function (formId, successEvent, showLoading) {
        try {

            Ajax.Post($('#' + formId).attr('action'), $('#' + formId).serialize(), successEvent, showLoading);
        } catch (e) {
        };
    },
    PostWithValidate: function (formId, successEvent, showLoading) {
        try {

            var $hasError = false;

            $formPostValidate.validate({
                ContainerId: formId,
                ErrorContainerModel: {
                    ClosestSelector: '.form-group',
                    Class: 'has-error'
                },
                ErrorMessageModel: {
                    ClosestSelector: '.validation',
                    Class: 'help-block help-block-error'
                },
                Completed: function (result) {
                    $hasError = result.HasError;
                }
            });

            if ($hasError) {
                return false;
            };
            Ajax.Post($('#' + formId).attr('action'), $('#' + formId).serialize(), successEvent, showLoading);

        } catch (e) {
        };
    },
    PostWithUrl: function (formId, url, successEvent, showLoading) {
        try {
            var $hasError = false;

            $formPostValidate.validate({
                ContainerId: formId,
                ErrorContainerModel: {
                    ClosestSelector: '.form-group',
                    Class: 'has-error'
                },
                ErrorMessageModel: {
                    ClosestSelector: '.validation',
                    Class: 'help-block help-block-error'
                },
                Completed: function (result) {
                    $hasError = result.HasError;
                }
            });

            if ($hasError) {
                return false;
            };
            Ajax.Post(url, $('#' + formId).serialize(), successEvent, showLoading);
        } catch (e) {
        };
    },
    FilePost: function (formId, progressId, progressBarId, successEvent) {
        $('#' + formId).ajaxForm({
            beforeSend: function () {
                $('#' + progressBarId).css('width', 0 + '%').attr('aria-valuenow', 0);
                Metronic.blockUI({ boxed: true });
            },
            uploadProgress: function (event, position, total, percentComplete) {
                $('#' + progressBarId).css('width', percentComplete + '%').attr('aria-valuenow', percentComplete);
            },
            beforeSubmit: function (formData, jqForm, options) {
                $('#' + progressId).show();
            },
            success: function (result, statusText) {
                $('#' + progressId).hide();
                $('#' + progressBarId).css('width', 0 + '%').attr('aria-valuenow', 0);
                if (result != null && result.HasError != null && result.HasError == true) {
                    ShowAlertList(result.Messages);
                    return;
                };
                successEvent(result);
            },
            error: function (xhr) {
                $('#' + progressId).hide();
                $('#' + progressBarId).css('width', 0 + '%').attr('aria-valuenow', 0);
            },
            complete: function () {
                Metronic.unblockUI();
            }
        });
    },
};


//utility function
function getFormData(data) {
    var unindexed_array = data;
    var indexed_array = {};
    var cag={};
    var irk={};

    $.map(unindexed_array, function(n, i) {
        var key=n['name'].toString();
        if(key === "cag"){
            debugger;
            cag["cid"]=n['value'];
            n['value']=cag;
        }

        if(key === "irk"){
            debugger;
            irk["iid"]=n['value'];
            n['value']=irk;
        }
        indexed_array[key] = n['value'];
    });

    return indexed_array;
}

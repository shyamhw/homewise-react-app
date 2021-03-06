import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity, 
  LayoutAnimation, 
  UIManager, 
  Platform,
  ART,
  KeyboardAvoidingView
} from 'react-native';
import PropTypes from 'prop-types';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { AnimatedGaugeProgress, GaugeProgress } from 'react-native-simple-gauge';

import Numeral from 'numeral';


import styles from './styles';
import Row from './Row';


class FixNFlipScreen extends Component {

  constructor(props) {
    super(props);
    if( Platform.OS === 'android' ){
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }


    this.state = {
      introScreen: true,

      roi: 0,
      roiAnnualized: 0,
      totalProjectedPreTaxProfits: 0,
      totalCashInvested: 0,
      monthlyHoldingCosts: 0,
      totalProjectedPreTaxProfitsHalf: 0,
      totalProjectedPreTaxProfitsDouble: 0,     
      monthlyMortgage: 0,

      monthlyExpenses: 0,

      listPrice: 0,
      downPayment: 0,
      downPaymentPercent: 20,
      loanTerm: 30,
      interestRate: 4.25,
      annualPropertyTaxes: 0,
      purchaseClosingCosts: 0,
      purchaseClosingCostsPercent: 3,

      exteriorRepairs: 0,
      interiorRepairs: 0,
      
      electric: 0,
      gas: 0,
      water: 0,
      sewer: 0,
      garbage: 0,
      hoa: 0,
      insurance: 0,
      other: 0,
      monthlyPropertyTaxes: 0,

      arv: 0,
      realEstateAgentFee: 0,
      realEstateAgentFeePercent: 6,
      otherMiscClosingCosts: 0,
      numberOfDaysHeld: 0,
      halfDaysHeld: 0,
      doubleDaysHeld: 0

      // textLayoutHeightUpfront: 0,
      // updatedHeightUpfront: 0, 
      // expandUpfront: false,
      // arrowUpfront: '^',

      // textLayoutHeightIncome: 0,
      // updatedHeightIncome: 0, 
      // expandIncome: false,
      // arrowIncome: '^',

      // textLayoutHeightExpense: 0,
      // updatedHeightExpense: 0, 
      // expandExpense: false,
      // arrowExpense: '^',
    };
  }

    static navigationOptions = {
        title: 'Calculators',
        headerTitleStyle :{textAlign: 'center',alignSelf:'center', color: '#fff', fontSize: 22},
        headerStyle:{
            backgroundColor:'#0091FF',
        },
        headerLeft: null
    };

  // componentWillMount(){
  //   this.props.toggle_roi_screen();
  // }

  _expand_collapse_function_upfront(){
    LayoutAnimation.configureNext( LayoutAnimation.Presets.easeInEaseOut );

    if( this.state.expandUpfront == false ){
      this.setState({ 
        updatedHeightUpfront: this.state.textLayoutHeightUpfront, 
        expandUpfront: true, 
        arrowUpfront: 'v'
      }); 
    }
    else{
      this.setState({ 
        updatedHeightUpfront: 0, 
        expandUpfront: false, 
        arrowUpfront: '^'
      });
    }
  }

  _expand_collapse_function_income(){
    LayoutAnimation.configureNext( LayoutAnimation.Presets.easeInEaseOut );

    if( this.state.expandIncome == false ){
      this.setState({ 
        updatedHeightIncome: this.state.textLayoutHeightIncome, 
        expandIncome: true, 
      }); 
    }
    else{
      this.setState({ 
        updatedHeightIncome: 0, 
        expandIncome: false, 
      });
    }
  }

  _expand_collapse_function_expense(){
    LayoutAnimation.configureNext( LayoutAnimation.Presets.easeInEaseOut );

    if( this.state.expandExpense == false ){
      this.setState({ 
        updatedHeightExpense: this.state.textLayoutHeightExpense, 
        expandExpense: true, 
      }); 
    }
    else{
      this.setState({ 
        updatedHeightExpense: 0, 
        expandExpense: false, 
      });
    }
  }

  setHeightUpfront(height){
    this.setState({ textLayoutHeightUpfront: height});
  }

  setHeightIncome(height){
    this.setState({ textLayoutHeightIncome: height});
  }

  setHeightExpense(height){
    this.setState({ textLayoutHeightExpense: height});
  }


  render(){

    return (
      <View style={styles.container}>

        <KeyboardAwareScrollView innerRef={ref => {this.scroll = ref}}>
              <View style={styles.otherStuff}>
                <View>
                  <TouchableOpacity
                  style={styles.idk}
                  onPress = {() => {
                    this.props.navigation.navigate('ROIScreen')
                    console.log(this.state);}}>
                      <Text style = {{color: '#0091FF'}}> ROI </Text>
                  </TouchableOpacity> 
                </View>
                <View>
                  <TouchableOpacity
                  style={styles.headerTabs2}
                  onPress = {() => {
                    this.props.navigation.navigate('MortgageScreen')
                    console.log(this.state);}}>
                      <Text style = {{color: '#0091FF'}}> Mortgage </Text>
                  </TouchableOpacity> 
                </View>
                <View>
                  <TouchableOpacity
                  style={styles.headerTabs3selected}
                  onPress = {() => {
                    console.log(this.state);}}>
                      <Text style = {{color: '#fff'}}> Fix & Flip </Text>
                  </TouchableOpacity> 
                </View>
              </View>
          <View style={{backgroundColor: '#f6fbfc',flexDirection: 'row', justifyContent: 'flex-end'}}>

            <TouchableOpacity
              onPress = {
              () => this._reset()
              }>
              <Text style = {styles.submitButtonText}> Reset </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.headerFixNFlip}>
              <AnimatedGaugeProgress
                size={300}
                width={15}
                fill={Number.parseInt(this.state.roi, 10)}
                rotation={90}
                cropDegree={180}
                tintColor="#0091FF"
                backgroundColor="#e7e7e7"
                stroke={[2, 2]} 
                strokeCap="circle">
                <View style={styles.textView}>
                    <Text style={{fontSize: 50, color: 'rgb(65,147,237)', fontWeight: 'bold'}}>{this.state.roi}%</Text>
                  <Text style = {{color:'black', fontSize: 18, marginBottom: 45}}>Cash-on-Cash Return (ROI)</Text>
                  </View>
              </AnimatedGaugeProgress>
              <View style={styles.fnfheaderval1}>
                <View style={styles.fnfinfo}>
                  <Text style={styles.infoTextFixNFlip}>{this.state.roiAnnualized}%</Text>
                  <Text style={styles.subTextFixNFlip}>ROI</Text>
                  <Text style={styles.subTextFixNFlip}>Annualized</Text>
                </View>
                <View style={styles.fnfinfo}>
                  <Text style={styles.infoTextFixNFlip}>${this.state.totalCashInvested}</Text>
                  <Text style={styles.subTextFixNFlip}>Total Cash</Text>
                  <Text style={styles.subTextFixNFlip}>Invested</Text>
                </View>
                <View style={styles.fnfinfo}>
                  <Text style={styles.infoTextFixNFlip}>${this.state.monthlyHoldingCosts}</Text>
                  <Text style={styles.subTextFixNFlip}>Monthly</Text>
                  <Text style={styles.subTextFixNFlip}>Holding Costs</Text>
                </View>                
              </View>
              <View style={styles.fnfheaderval2}>
                <View style={styles.fnfinfo}>
                  <Text style={styles.infoTextFixNFlip}>${this.state.totalProjectedPreTaxProfitsHalf}</Text>
                  <Text style={styles.subTextFixNFlip}>Profits</Text>
                  <Text style={styles.subTextFixNFlip}>{this.state.halfDaysHeld} Days</Text>
                </View>
                <View style={styles.fnfinfo}>
                  <Text style={styles.infoTextFixNFlip}>${this.state.totalProjectedPreTaxProfits}</Text>
                  <Text style={styles.subTextFixNFlip}>Profits</Text>
                  <Text style={styles.subTextFixNFlip}>{this.state.numberOfDaysHeld} Days</Text>
                </View>
                <View style={styles.fnfinfo}>
                  <Text style={styles.infoTextFixNFlip}>${this.state.totalProjectedPreTaxProfitsDouble}</Text>
                  <Text style={styles.subTextFixNFlip}>Profits</Text>
                  <Text style={styles.subTextFixNFlip}>{this.state.doubleDaysHeld} Days</Text>
                </View>                
              </View>
            </View>
          <View style={styles.body}> 
            <View style={styles.headerRow}>
              <Text style={styles.headerRowText}>Purchase Details</Text>
            </View>

            <View style={styles.caption}>
              <Text style={styles.captionText}>Purchase Price</Text>
            </View>
            <View style={styles.row}>
              <TextInput
                style={styles.dollaSign}
                keyboardType = {'numeric'}
                value = '$'
                editable={false}>
              </TextInput>
              <TextInput
                style={styles.values}
                keyboardType = {'numeric'}
                returnKeyType = {'done'}
                placeholder = '0'
                value = {Numeral((this.state.listPrice).toString()).format('0,0')}
                onChangeText={(listPrice) => this._listPriceOnChangeText(listPrice)}>
              </TextInput>
              <TextInput
                style={styles.percentPlace}
                editable={false}>
              </TextInput>
            </View>


            <View style={styles.caption}>
              <Text style={styles.captionText}>Down Payment</Text>
            </View>
            <View style={styles.row}>
              <TextInput
                style={styles.dollaSign}
                keyboardType = {'numeric'}
                value = '$'
                editable={false}>
              </TextInput>
              <TextInput
                style={styles.values}
                keyboardType = {'numeric'}
                returnKeyType = {'done'}
                placeholder = '0'
                value = {(this.state.downPayment).toString()}
                onChangeText={(downPayment) => this._downPaymentOnChangeText(downPayment)}>
              </TextInput>
              <TextInput
                style={styles.percentValue}
                returnKeyType = {'done'}
                placeholder = '0'
                keyboardType ={'numeric'}
                value = {(this.state.downPaymentPercent).toString()}
                onChangeText={(downPaymentPercent) => this._downPaymentPercentOnChangeText(downPaymentPercent)}>
              </TextInput>
              <TextInput
                style={styles.percentSign}
                keyboardType = {'numeric'}
                value = '%'
                editable={false}>
              </TextInput>
            </View>

            <View style={styles.caption}>
              <Text style={styles.captionText}>Purchase Closing Costs</Text>
            </View>
            <View style={styles.row}>
              <TextInput
                style={styles.dollaSign}
                keyboardType = {'numeric'}
                value = '$'
                editable={false}>
              </TextInput>
              <TextInput
                style={styles.values}
                keyboardType = {'numeric'}
                returnKeyType = {'done'}
                placeholder = '0'
                value = {(this.state.purchaseClosingCosts).toString()}
                onChangeText={(purchaseClosingCosts) => this._closingCostsOnChangeText(purchaseClosingCosts)}>
              </TextInput>
              <TextInput
                style={styles.percentValue}
                returnKeyType = {'done'}
                placeholder = '0'
                keyboardType ={'numeric'}
                value = {(this.state.purchaseClosingCostsPercent).toString()}
                onChangeText={(purchaseClosingCostsPercent) => this._closingCostsPercentOnChangeText(purchaseClosingCostsPercent)}>
              </TextInput>
              <TextInput
                style={styles.percentSign}
                keyboardType = {'numeric'}
                value = '%'
                editable={false}>
              </TextInput>
            </View>  


            <Row caption="Interest Rate" sign='%' value={(this.state.interestRate).toString()} update={(interestRate) => this.setState({interestRate})}/>
            <Row caption="Loan Term (Years)" sign='' value={Numeral((this.state.loanTerm).toString()).format('0,0')} update={(loanTerm) => this.setState({loanTerm})}/>

            <View style={styles.caption}>
              <Text style={styles.captionText}>Annual Property Taxes</Text>
            </View>
            <View style={styles.row}>
              <TextInput
                style={styles.dollaSign}
                keyboardType = {'numeric'}
                value = '$'
                editable={false}>
              </TextInput>
              <TextInput
                style={styles.values}
                keyboardType = {'numeric'}
                returnKeyType = {'done'}
                placeholder = '0'
                value = {Numeral((this.state.annualPropertyTaxes).toString()).format('0,0')}
                onChangeText={(annualPropertyTaxes) => this._annualPropertyTaxesOnChangeText(annualPropertyTaxes)}>
              </TextInput>
              <TextInput
                style={styles.percentPlace}
                editable={false}>
              </TextInput>
            </View> 



            <View style={styles.headerRow}>
              <Text style={styles.headerRowText}>Estimated Repair Costs</Text>
            </View>
            <Row caption="Exterior Repairs" sign='$' value={Numeral((this.state.exteriorRepairs).toString()).format('0,0')} update={(exteriorRepairs) => this.setState({exteriorRepairs})}/>
            <Row caption="Interior Repairs" sign='$' value={Numeral((this.state.interiorRepairs).toString()).format('0,0')} update={(interiorRepairs) => this.setState({interiorRepairs})}/>

            <View style={styles.headerRow}>
              <Text style={styles.headerRowText}>Estimated Repair Costs</Text>
            </View>
            <Row caption="Electric" sign='$' value={Numeral((this.state.electric).toString()).format('0,0')} update={(electric) => this.setState({electric})}/>
            <Row caption="Gas" sign='$' value={Numeral((this.state.gas).toString()).format('0,0')} update={(gas) => this.setState({gas})}/>
            <Row caption="Water" sign='$' value={Numeral((this.state.water).toString()).format('0,0')} update={(water) => this.setState({water})}/>
            <Row caption="Sewer" sign='$' value={Numeral((this.state.sewer).toString()).format('0,0')} update={(sewer) => this.setState({sewer})}/>
            <Row caption="Garbage" sign='$' value={Numeral((this.state.garbage).toString()).format('0,0')} update={(garbage) => this.setState({garbage})}/>
            <Row caption="HOA" sign='$' value={Numeral((this.state.hoa).toString()).format('0,0')} update={(hoa) => this.setState({hoa})}/>
            <Row caption="Insurance" sign='$' value={Numeral((this.state.insurance).toString()).format('0,0')} update={(insurance) => this.setState({insurance})}/>
            <Row caption="Other" sign='$' value={Numeral((this.state.other).toString()).format('0,0')} update={(other) => this.setState({other})}/>
            <Row caption="Monthly Property Tax" sign='$' value={Numeral((this.state.monthlyPropertyTaxes).toString()).format('0,0')} editable = {false} update={(monthlyPropertyTaxes) => this.setState({monthlyPropertyTaxes})}/>

            <View style={styles.headerRow}>
              <Text style={styles.headerRowText}>Sale Details</Text>
            </View>
            <View style={styles.caption}>
              <Text style={styles.captionText}>Sales Price After Fix Up (ARV)</Text>
            </View>
            <View style={styles.row}>
              <TextInput
                style={styles.dollaSign}
                keyboardType = {'numeric'}
                value = '$'
                editable={false}>
              </TextInput>
              <TextInput
                style={styles.values}
                keyboardType = {'numeric'}
                returnKeyType = {'done'}
                placeholder = '0'
                value = {Numeral((this.state.arv).toString()).format('0,0')}
                onChangeText={(arv) => this._ARVOnChangeText(arv)}>
              </TextInput>
              <TextInput
                style={styles.percentPlace}
                editable={false}>
              </TextInput>
            </View>
            <View style={styles.caption}>
              <Text style={styles.captionText}>Real Estate Agent Fee</Text>
            </View>
            <View style={styles.row}>
              <TextInput
                style={styles.dollaSign}
                keyboardType = {'numeric'}
                value = '$'
                editable={false}>
              </TextInput>
              <TextInput
                style={styles.values}
                keyboardType = {'numeric'}
                returnKeyType = {'done'}
                placeholder = '0'
                value = {(this.state.realEstateAgentFee).toString()}
                onChangeText={(realEstateAgentFee) => this._realEstateAgentFeeOnChangeText(realEstateAgentFee)}>
              </TextInput>
              <TextInput
                style={styles.percentValue}
                returnKeyType = {'done'}
                placeholder = '0'
                keyboardType ={'numeric'}
                value = {(this.state.realEstateAgentFeePercent).toString()}
                onChangeText={(realEstateAgentFeePercent) => this._realEstateAgentFeePercentOnChangeText(realEstateAgentFeePercent)}>
              </TextInput>
              <TextInput
                style={styles.percentSign}
                keyboardType = {'numeric'}
                value = '%'
                editable={false}>
              </TextInput>
            </View>  
            <Row caption="Other Miscellaneous Closing Costs" sign='$' value={Numeral((this.state.otherMiscClosingCosts).toString()).format('0,0')} update={(otherMiscClosingCosts) => this.setState({otherMiscClosingCosts})}/>
            <Row caption="Number of Days Held (Days)" sign='' value={Numeral((this.state.numberOfDaysHeld).toString()).format('0,0')} update={(numberOfDaysHeld) => this.setState({numberOfDaysHeld})}/>
          </View>
          <TouchableOpacity
                   style = {styles.submitButton2}
                   onPress = {
                      () => this._calculate()
                   }>
                   <Text style = {styles.submitButtonText2}> Calculate </Text>
          </TouchableOpacity>
        </KeyboardAwareScrollView>        
      </View>      
    );
  }

  _onClick(){
    this.props.toggle_fixnflip_screen();
    console.log(this.state);
  }  

    _reset(){
    this.setState({
      roi: 0,
      roiAnnualized: 0,
      totalProjectedPreTaxProfits: 0,
      totalCashInvested: 0,
      monthlyHoldingCosts: 0,
      totalProjectedPreTaxProfitsHalf: 0,
      totalProjectedPreTaxProfitsDouble: 0,     
      monthlyMortgage: 0,

      monthlyExpenses: 0,

      listPrice: 0,
      downPayment: 0,
      downPaymentPercent: 20,
      loanTerm: 30,
      interestRate: 4,
      annualPropertyTaxes: 0,
      purchaseClosingCosts: 0,
      purchaseClosingCostsPercent: 3,

      exteriorRepairs: 0,
      interiorRepairs: 0,
      
      electric: 0,
      gas: 0,
      water: 0,
      sewer: 0,
      garbage: 0,
      hoa: 0,
      insurance: 0,
      other: 0,
      monthlyPropertyTaxes: 0,

      arv: 0,
      realEstateAgentFee: 0,
      realEstateAgentFeePercent: 6,
      otherMiscClosingCosts: 0,
      numberOfDaysHeld: 0,
      halfDaysHeld: 0,
      doubleDaysHeld: 0
    });
  } 

  _listPriceOnChangeText(listPrice){
    let downPayment;
    let purchaseClosingCosts;

    downPayment = Numeral(listPrice).value() * (Number.parseFloat(this.state.downPaymentPercent)/100);
    purchaseClosingCosts = Numeral(listPrice).value() * (Number.parseFloat(this.state.purchaseClosingCostsPercent)/100);

    this.setState({
      listPrice: Numeral((listPrice).toString()).format('0,0.[00]'),
      downPayment: Numeral((downPayment).toString()).format('0,0.[00]'),
      purchaseClosingCosts: Numeral((purchaseClosingCosts).toString()).format('0,0.[00]'),

      introScreen: false,
    }); 
  } 

  _annualPropertyTaxesOnChangeText(annualPropertyTaxes){
    let monthlyPropertyTaxes = Numeral(annualPropertyTaxes).value()/12;

    this.setState({
      annualPropertyTaxes: Numeral((annualPropertyTaxes).toString()).format('0,0.[00]'),
      monthlyPropertyTaxes: Numeral((monthlyPropertyTaxes).toString()).format('0,0.[00]')
    }); 
  }

  _downPaymentOnChangeText(downPayment){

    let downPaymentVal = Numeral(downPayment).value();
    let downPaymentPercent = (downPaymentVal / Numeral(this.state.listPrice).value()) * 100;
    console.log('listPrice ' + this.state.listPrice);
    console.log('downPayment ' + downPaymentVal);
    console.log('downPaymentPercent ' + downPaymentPercent);

    this.setState({
      downPayment: Numeral((downPayment).toString()).format('0,0'),
      downPaymentPercent: +(downPaymentPercent.toFixed(2))
    });
  }

  _downPaymentPercentOnChangeText(downPaymentPercent){

    let downPayment = Numeral(this.state.listPrice).value() * (Number.parseFloat(downPaymentPercent)/100);

    this.setState({
      downPayment: Numeral((downPayment).toString()).format('0,0.[00]'),
      downPaymentPercent: downPaymentPercent
    })
  }

  _closingCostsOnChangeText(purchaseClosingCosts){

    let purchaseClosingCostsVal = Numeral(purchaseClosingCosts).value();
    let purchaseClosingCostsPercent = (purchaseClosingCostsVal / Numeral(this.state.listPrice).value()) * 100;


    this.setState({
      purchaseClosingCosts: Numeral((purchaseClosingCosts).toString()).format('0,0'),
      purchaseClosingCostsPercent: +(purchaseClosingCostsPercent.toFixed(2))
    });
  }

  _closingCostsPercentOnChangeText(purchaseClosingCostsPercent){

    let purchaseClosingCosts = Numeral(this.state.listPrice).value() * (Number.parseFloat(purchaseClosingCostsPercent)/100);

    this.setState({
      purchaseClosingCosts: Numeral((purchaseClosingCosts).toString()).format('0,0.[00]'),
      purchaseClosingCostsPercent: purchaseClosingCostsPercent
    })
  }

  _ARVOnChangeText(arv){
  let realEstateAgentFee;

  realEstateAgentFee = Numeral(arv).value() * (Number.parseFloat(this.state.realEstateAgentFeePercent)/100);
  console.log('arv' + arv);
  console.log('realEstateAgentFee' + realEstateAgentFee);

    this.setState({
      arv: Numeral((arv).toString()).format('0,0'),
      realEstateAgentFee: Numeral((realEstateAgentFee).toString()).format('0,0.[0]')
    }); 
  } 

  _realEstateAgentFeeOnChangeText(realEstateAgentFee){

    let realEstateAgentFeeVal = Numeral(realEstateAgentFee).value();
    let realEstateAgentFeePercent = (realEstateAgentFeeVal / Numeral(this.state.arv).value()) * 100;
    console.log('arv ' + this.state.arv);
    console.log('realEstateAgentFee ' + realEstateAgentFee);
    console.log('realEstateAgentFeePercent ' + realEstateAgentFeePercent);

    this.setState({
      realEstateAgentFee: Numeral((realEstateAgentFee).toString()).format('0,0'),
      realEstateAgentFeePercent: +(realEstateAgentFeePercent.toFixed(2))
    });
  }

  _realEstateAgentFeePercentOnChangeText(realEstateAgentFeePercent){

    let realEstateAgentFee = Numeral(this.state.arv).value() * (Number.parseFloat(realEstateAgentFeePercent)/100);

    this.setState({
      realEstateAgentFee: Numeral((realEstateAgentFee).toString()).format('0,0.[00]'),
      realEstateAgentFeePercent: realEstateAgentFeePercent
    })
  }

  _calculate(){
    let listPrice = Numeral(this.state.listPrice).value();
    let downPayment = Numeral(this.state.downPayment).value();
    let loanTerm = Numeral(this.state.loanTerm).value() * 12;
    let interestRate = Number.parseFloat(this.state.interestRate)/100;
    let annualPropertyTaxes = Numeral(this.state.annualPropertyTaxes).value();
    let purchaseClosingCost = Numeral(this.state.purchaseClosingCosts).value();

    let repairs = Numeral(this.state.interiorRepairs).value() + Numeral(this.state.exteriorRepairs).value();

    let monthlyExpenses = Number.parseFloat(this.state.electric) + Number.parseFloat(this.state.gas) + Number.parseFloat(this.state.water)
      + Number.parseFloat(this.state.sewer) + Number.parseFloat(this.state.garbage) + Number.parseFloat(this.state.hoa)
      + Number.parseFloat(this.state.insurance) + Number.parseFloat(this.state.other) + Number.parseFloat(this.state.monthlyPropertyTaxes);

    let arv = Numeral(this.state.arv).value();
    let realEstateAgentFee = Numeral(this.state.realEstateAgentFee).value();
    let otherMiscClosingCosts = Numeral(this.state.otherMiscClosingCosts).value();

    let numberOfDaysHeld = Numeral(this.state.numberOfDaysHeld).value();

    //Monthly Mortgage
    let interestRateVal = 1 + (interestRate/12);
    let monthlyMortgage = ((listPrice - downPayment) * (interestRate/12) * 
      Math.pow(interestRateVal,loanTerm))/(Math.pow(interestRateVal,loanTerm) - 1);

    //Monthly Holding Costs
    let monthlyHoldingCosts = monthlyMortgage + monthlyExpenses;

    //Total Cash Invested
    let totalCashInvested = purchaseClosingCost + repairs + downPayment + (monthlyHoldingCosts * (numberOfDaysHeld / 30));

    //Total Projected Pre-Tax Profits
    let profitshelper = arv - realEstateAgentFee - otherMiscClosingCosts - listPrice - purchaseClosingCost
      - repairs;
    let totalProjectedPreTaxProfits = profitshelper - (monthlyHoldingCosts * (numberOfDaysHeld / 30));

    //Total Projected Profits for half the days
    let halfDaysHeld = Math.round((numberOfDaysHeld/2));
    let totalProjectedPreTaxProfitsHalf = profitshelper - (monthlyHoldingCosts * (halfDaysHeld / 30));

    //Total Projected Profits for 2 times the days
    let doubleDaysHeld = numberOfDaysHeld * 2;
    let totalProjectedPreTaxProfitsDouble = profitshelper - (monthlyHoldingCosts * (doubleDaysHeld / 30));

    //ROI
    let roi = (totalProjectedPreTaxProfits/Number.parseFloat(totalCashInvested)) * 100;
    roi = roi || 0;

    //ROI Annualized 
    let roiAnnualized = roi * (365/Number.parseFloat(numberOfDaysHeld));
    roiAnnualized = roiAnnualized || 0;
    console.log('test');

    // roi = roi * 100;
    // roiAnnualized = roiAnnualized * 100;

    this.scroll.props.scrollToPosition(0, 0)



    this.setState({
      roi: +(roi.toFixed(1)),
      roiAnnualized: +(roiAnnualized.toFixed(1)),
      monthlyExpenses: Numeral((Math.round(monthlyExpenses)).toString()).format('0,0'),
      totalProjectedPreTaxProfits: Numeral((Math.round(totalProjectedPreTaxProfits)).toString()).format('0,0'),
      totalCashInvested: Numeral((Math.round(totalCashInvested)).toString()).format('0,0'),
      monthlyHoldingCosts: Numeral((Math.round(monthlyHoldingCosts)).toString()).format('0,0'),
      totalProjectedPreTaxProfitsHalf: Numeral((Math.round(totalProjectedPreTaxProfitsHalf)).toString()).format('0,0'),
      totalProjectedPreTaxProfitsDouble: Numeral((Math.round(totalProjectedPreTaxProfitsDouble)).toString()).format('0,0'),
      monthlyMortgage: +(monthlyMortgage.toFixed(2)),
      doubleDaysHeld: doubleDaysHeld,
      halfDaysHeld: halfDaysHeld
    });
    console.log(this.state);   
  }
}


export default FixNFlipScreen;
